import { singleton } from 'tsyringe';
import { EventName } from '../../core/event-name.enum';
import { LocalizeService } from '../../core/i18n/localize.service';
import { Message } from '../../core/message.interface';
import { PaymentMethod } from '../../core/payment-method.interface';
import { Handler } from '../../core/post-messages-client/handler.type';
import { PostMessagesClient } from '../../core/post-messages-client/post-messages-client';
import { webComponents } from '../../core/web-components/web-components.map';
import { SavedMethod } from '../../core/saved-method.interface';
import { UserBalance } from '../../core/user-balance.interface';
import { HeadlessCheckoutSpy } from '../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { FormConfiguration } from '../../core/form/form-configuration.interface';
import { Form } from '../../core/form/form.interface';
import { NextAction } from '../../core/actions/next-action.interface';
import { FormSpy } from '../../core/spy/form-spy/form-spy';
import { Status } from '../../core/status/status.interface';
import { getErrorHandler } from './post-messages-handlers/error.handler';
import { initFormHandler } from './post-messages-handlers/init-form.handler';
import { getQuickMethodsHandler } from './post-messages-handlers/get-quick-methods.handler';
import { setTokenHandler } from './post-messages-handlers/set-token.handler';
import { getRegularMethodsHandler } from './post-messages-handlers/get-regular-methods.handler';
import { getSavedMethodsHandler } from './post-messages-handlers/get-saved-methods.handler';
import { getUserBalanceHandler } from './post-messages-handlers/get-user-balance.handler';
import { nextActionHandler } from './post-messages-handlers/next-action.handler';
import { Field } from '../../core/form/field.interface';
import { getPaymentStatusHandler } from './post-messages-handlers/get-payment-status/get-payment-status.handler';
import { EnvironmentService } from '../../core/environment/environment.service';
import { FinanceDetails } from '../../core/finance-details/finance-details.interface';
import { getFinanceDetailsHandler } from './post-messages-handlers/get-finance-details.handler';
import { FormStatus } from '../../core/status/form-status.enum';
import { setSecureComponentStylesHandler } from './post-messages-handlers/set-secure-component-styles.handler';
import { formFieldsStatusChangedHandler } from './post-messages-handlers/form-fields-status-changed.handler';
import { FormFieldsStatus } from '../../core/form/form-fields-status.interface';
import { getCombinedPaymentMethodsHandler } from './post-messages-handlers/get-combined-payment-methods.handler';
import { CombinedPaymentMethods } from '../../core/combined-payment-methods.interface';
import { ThemesLoader } from '../../core/customization/themes-loader';
import { Lang } from '../../core/i18n/lang.enum';
import { getCountryListHandler } from './post-messages-handlers/get-country-list.handler';
import { CountryResponse } from '../../core/country-response.interface';
import { FormLoader } from '../../core/form/form-loader';
import { InitialOptions } from './initial-options.interface';
import { submitHandler } from './post-messages-handlers/submit/submit.handler';
import { externalInputChangeValueHandler } from './post-messages-handlers/external-input-change-value/external-input-change-value.handler';
import { isGooglePaySettingsGuard } from '../../core/form/types/is-google-pay-settings.guard';
import { isApplePaySettingsGuard } from '../../core/form/types/is-apple-pay-settings.guard';
import { PaymentConfigurationApplePaySettings } from '../../core/form/types/apple-pay-form-configuration.interface';
import { PaymentConfigurationGooglePaySettings } from '../../core/form/types/google-pay-form-configuration.interface';

@singleton()
export class HeadlessCheckout {
  public events = {
    /**
     * Send public message
     * @param msg Message to send
     * @param handler Handler to process response data
     * @returns promise that will be resolved once response is recieved
     */
    send: async <T>(msg: Message, handler: Handler<T>): Promise<T | void> => {
      return this.postMessagesClient.send<T>(msg, handler);
    },

    /**
     * Add core event listener
     * @param eventName Name of event to listen
     * @param handler Handler to process response data
     * @param callback Callback for event
     * @return {Function} function to remove listener
     */
    onCoreEvent: <T>(
      eventName: EventName,
      handler: Handler<T>,
      callback: (value?: T) => void,
    ): (() => void) => {
      return this.postMessagesClient.listen(eventName, handler, callback);
    },
  };

  public form = {
    /**
     * Initialize payment form
     * @param configuration Form configuration
     * @returns {Form} form details
     */
    init: async (configuration: FormConfiguration): Promise<Form> => {
      this._formConfiguration =
        this.getFormConfigurationWithDefaultValues(configuration);
      this.formStatus = FormStatus.pending;

      const msg: Message = {
        name: EventName.initForm,
        data: {
          configuration: this._formConfiguration,
        },
      };

      this.formSpy.formWasInit = false;

      return this.postMessagesClient.send<Form>(msg, (message) =>
        initFormHandler(message, (args?: unknown) => {
          if (args) {
            this.formSpy.formFields = (args as { fields: Field[] }).fields;
          }
          this.formSpy.formWasInit = true;
          this.formStatus = FormStatus.active;
        }),
      ) as Promise<Form>;
    },

    onNextAction: (callbackFn: (nextAction: NextAction) => void): void => {
      this.postMessagesClient.listen<NextAction>(
        EventName.nextAction,
        nextActionHandler,
        (nextAction) => {
          if (nextAction) {
            callbackFn(nextAction);
          }
        },
      );
    },

    onFieldsStatusChange: (
      callbackFn: (fieldsStatus: FormFieldsStatus) => void,
    ): void => {
      this.postMessagesClient.listen<FormFieldsStatus>(
        EventName.formFieldsStatusChanged,
        formFieldsStatusChangedHandler,
        (fieldsStatus) => {
          if (fieldsStatus) {
            callbackFn(fieldsStatus);
          }
        },
      );
    },

    getStatus: (): FormStatus => {
      if (this.formSpy.formWasInit) {
        return FormStatus.active;
      }

      return this.formStatus === FormStatus.pending
        ? FormStatus.pending
        : FormStatus.undefined;
    },

    activate: (): void => {
      this.formStatus = FormStatus.active;
    },

    setupAndAwaitFieldsLoading: async (fields: Field[]): Promise<void> =>
      this.formLoader.setupAndAwaitFieldsLoading(fields),

    updateFormFieldValue: (fieldName: string, value: unknown): void => {
      const msg: Message = {
        name: EventName.externalChangeInputValue,
        data: {
          fieldName,
          value,
        },
      };

      void this.postMessagesClient.send(msg, externalInputChangeValueHandler);
    },

    submit: async (): Promise<void> => {
      await this.postMessagesClient.send(
        {
          name: EventName.submitForm,
        },
        submitHandler,
      );
    },
  };

  public get formConfiguration(): FormConfiguration | undefined {
    return this._formConfiguration;
  }

  private formStatus: FormStatus = FormStatus.undefined;
  private isWebView?: boolean;
  private theme?: string;
  private topLevelDomain?: string;
  private isApplePayInstantFlowEnabled = false;
  private locale = Lang.EN;
  private coreIframe!: HTMLIFrameElement;
  private errorsSubscription?: () => void;
  private _formConfiguration?: FormConfiguration;

  public constructor(
    private readonly window: Window,
    private readonly postMessagesClient: PostMessagesClient,
    private readonly localizeService: LocalizeService,
    private readonly headlessCheckoutSpy: HeadlessCheckoutSpy,
    private readonly formSpy: FormSpy,
    private readonly themesLoader: ThemesLoader,
    private readonly formLoader: FormLoader,
    private readonly environmentService: EnvironmentService,
  ) {}

  public async init(environment: InitialOptions): Promise<void> {
    this.isWebView = environment.isWebview;
    this.environmentService.isSandbox = !!environment.sandbox;
    this.theme = environment.theme;
    this.topLevelDomain = environment.topLevelDomain;
    this.isApplePayInstantFlowEnabled =
      !!environment.isApplePayInstantFlowEnabled;
    this.locale = environment.language ?? Lang.EN;

    await this.localizeService.initDictionaries(environment.language);

    this.postMessagesClient.init(
      this.coreIframe,
      this.environmentService.getHeadlessCheckoutAppUrl(),
    );
    await this.setupCoreIframe();
    this.defineComponents();

    this.postMessagesClient.init(
      this.coreIframe,
      this.environmentService.getHeadlessCheckoutAppUrl(),
    );
    void this.setupSecureStyles(this.theme);
    this.errorsSubscription = this.postMessagesClient.listen<string>(
      EventName.error,
      getErrorHandler,
      (error) => {
        throw new Error(error);
      },
    );
  }

  /**
   * Destroys current instance and creates a new one.
   */
  public destroy(): void {
    this.destroyCoreIframe();
    this.errorsSubscription?.();
  }

  /**
   * Initialize the payment with a token.
   * Reset the form on initialization.
   */
  public async setToken(token: string): Promise<void> {
    if (!token) {
      throw new Error('Need correct token');
    }

    const msg: Message = {
      name: EventName.initPayment,
      data: {
        configuration: {
          token,
          isWebView: this.isWebView,
          sandbox: this.environmentService.isSandbox,
          topLevelDomain: this.topLevelDomain,
          isApplePayInstantFlowEnabled: this.isApplePayInstantFlowEnabled,
          locale: this.locale,
        },
      },
    };

    return this.postMessagesClient.send<void>(msg, (message) =>
      setTokenHandler(message, () => {
        this.headlessCheckoutSpy.appWasInit = true;
      }),
    );
  }

  public async setSecureComponentStyles(styles: string): Promise<void> {
    return this.postMessagesClient.send(
      {
        name: EventName.setSecureComponentStyles,
        data: styles,
      },
      setSecureComponentStylesHandler,
    );
  }

  /**
   * Returns finance details for created payment
   * @returns promise that returns finance details
   */
  public async getFinanceDetails(): Promise<FinanceDetails | null> {
    const msg: Message = {
      name: EventName.financeDetails,
    };

    return this.postMessagesClient.send<FinanceDetails | null>(
      msg,
      getFinanceDetailsHandler,
    ) as Promise<FinanceDetails | null>;
  }

  public onUpdateFinanceDetails(
    callbackFn: (financeDetails: FinanceDetails) => void,
  ): void {
    this.postMessagesClient.listen<FinanceDetails | null>(
      EventName.financeDetails,
      getFinanceDetailsHandler,
      (financeDetails) => {
        if (financeDetails) {
          callbackFn(financeDetails);
        }
      },
    );
  }

  /**
   * Returns available payment methods except quick methods
   * @param country Country that quick methods should be loaded for.
   *  Country from token is used by default
   * @returns promise that returns payment methods
   */
  public async getRegularMethods(options?: {
    country?: string;
    isSaveMethodMode?: boolean;
  }): Promise<PaymentMethod[]> {
    const msg: Message = {
      name: EventName.getPaymentMethodsList,
      data: {
        country: options?.country,
        isSaveMethodMode: options?.isSaveMethodMode,
      },
    };

    return this.postMessagesClient.send<PaymentMethod[]>(
      msg,
      getRegularMethodsHandler,
    ) as Promise<PaymentMethod[]>;
  }

  /**
   * Returns available quick payment methods like ApplePay, GooglePay, etc.
   * @param country Country that quick methods should be loaded for.
   *  Country from token is used by default
   * @returns promise that returns payment methods
   */
  public async getQuickMethods(country?: string): Promise<PaymentMethod[]> {
    const msg: Message = {
      name: EventName.getPaymentQuickMethods,
      data: {
        country,
      },
    };

    return this.postMessagesClient.send<PaymentMethod[]>(
      msg,
      getQuickMethodsHandler,
    ) as Promise<PaymentMethod[]>;
  }

  /**
   * Returns available payment methods, including quick payment options and saved payment methods.
   */
  public async getCombinedPaymentMethods(
    country?: string,
  ): Promise<CombinedPaymentMethods> {
    const msg: Message = {
      name: EventName.getCombinedPaymentMethods,
      data: {
        country,
      },
    };

    return this.postMessagesClient.send<CombinedPaymentMethods>(
      msg,
      getCombinedPaymentMethodsHandler,
    ) as Promise<CombinedPaymentMethods>;
  }

  /**
   * Returns user's saved methods.
   */
  public async getSavedMethods(): Promise<SavedMethod[]> {
    const msg: Message = {
      name: EventName.getSavedMethods,
    };

    return this.postMessagesClient.send<SavedMethod[]>(
      msg,
      getSavedMethodsHandler,
    ) as Promise<SavedMethod[]>;
  }

  /**
   * Returns a user's balance.
   */
  public async getUserBalance(): Promise<UserBalance> {
    const msg: Message = {
      name: EventName.getUserBalance,
    };

    return this.postMessagesClient.send<UserBalance>(
      msg,
      getUserBalanceHandler,
    ) as Promise<UserBalance>;
  }

  /**
   * Get the final payment status: Success or Error.
   * Calling this method breaks the previous connection.
   * Use the invoiceId argument after a return from the payment system.
   * @throws UndefinedFormError if you did not pass invoiceId and the initialized form does not exist.
   * @throws BreakConnectionError if the method is called again.
   */
  public async getStatus(): Promise<Status> {
    const msg: Message = {
      name: EventName.getPaymentStatus,
      data: {
        url: this.window.location.href,
      },
    };

    return this.postMessagesClient.send<Status>(msg, (message) =>
      getPaymentStatusHandler(message),
    ) as Promise<Status>;
  }

  /**
   * Returns available locales.
   */
  public getAvailableLanguages(): Lang[] {
    return this.localizeService.getAvailableLanguages();
  }

  /**
   * Returns available countries.
   */
  public async getCountryList(): Promise<{
    countryList: CountryResponse['countryList'];
    currentCountry: string;
  }> {
    const msg: Message = {
      name: EventName.getCountryList,
    };

    return this.postMessagesClient.send<{
      countryList: CountryResponse['countryList'];
      currentCountry: string;
    }>(msg, getCountryListHandler) as Promise<{
      countryList: CountryResponse['countryList'];
      currentCountry: string;
    }>;
  }

  private async setupCoreIframe(): Promise<void> {
    this.coreIframe = this.window.document.createElement('iframe');
    this.coreIframe.width = '0px';
    this.coreIframe.height = '0px';
    this.coreIframe.style.border = 'none';
    this.coreIframe.style.position = 'absolute';
    this.coreIframe.src = `${this.environmentService.getHeadlessCheckoutAppUrl()}/core`;
    this.coreIframe.name = 'core';
    this.window.document.body.appendChild(this.coreIframe);
    return this.listenCoreIframeLoading();
  }

  private async listenCoreIframeLoading(): Promise<void> {
    return new Promise((resolve) => {
      const handler = (event: MessageEvent): void => {
        if (typeof event.data !== 'string') {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (JSON.parse(event.data).name === EventName.isReady) {
          resolve();
          this.window.removeEventListener('message', handler);
        }
      };
      this.window.addEventListener('message', handler);
    });
  }

  private destroyCoreIframe(): void {
    this.coreIframe.remove();
  }

  private defineComponents(): void {
    Object.entries(webComponents).forEach(([tagName, component]) => {
      if (this.window.customElements.get(tagName)) {
        return;
      }

      this.window.customElements.define(tagName, component);
    });
  }

  private async setupSecureStyles(themeName?: string): Promise<void> {
    if (!themeName) {
      return;
    }
    const themeStyles = this.themesLoader.getTheme();
    await this.setSecureComponentStyles(themeStyles);
  }

  private getFormConfigurationWithDefaultValues(
    configuration: FormConfiguration,
  ): FormConfiguration {
    const configurationWithDefaultValues = configuration;

    if (
      isGooglePaySettingsGuard(configuration) &&
      !configuration.paymentMethodSettings
    ) {
      configurationWithDefaultValues.paymentMethodSettings =
        this.getDefaultGooglePaySettings(configuration);
    }

    if (isApplePaySettingsGuard(configuration)) {
      configurationWithDefaultValues.paymentMethodSettings =
        this.getDefaultApplePaySettings(configuration);
    }

    return configurationWithDefaultValues;
  }

  private getDefaultGooglePaySettings(
    configuration: PaymentConfigurationGooglePaySettings,
  ): PaymentConfigurationGooglePaySettings['paymentMethodSettings'] {
    if (!configuration.paymentMethodSettings) {
      return {
        useSdkHandlerForUserBackRedirect: true,
      };
    }

    return {
      ...configuration.paymentMethodSettings,
      useSdkHandlerForUserBackRedirect:
        configuration.paymentMethodSettings?.useSdkHandlerForUserBackRedirect ??
        true,
    };
  }

  private getDefaultApplePaySettings(
    configuration: PaymentConfigurationApplePaySettings,
  ): PaymentConfigurationApplePaySettings['paymentMethodSettings'] {
    if (!configuration.paymentMethodSettings) {
      return {
        enableExternalWindowOpenMessage: false,
      };
    }

    return {
      ...configuration.paymentMethodSettings,
      enableExternalWindowOpenMessage:
        configuration.paymentMethodSettings?.enableExternalWindowOpenMessage ??
        false,
    };
  }
}
