import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { Field } from '../../../../core/form/field.interface';
import { HeadlessCheckout } from '../../headless-checkout';
import { EventName } from '../../../../core/event-name.enum';
import { getMissedFields } from './get-missed-fields.function';
import { getInvalidFields } from './get-invalid-fields.function';
import { PaymentFormFieldsService } from './payment-form-fields.service';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { formControlsTags } from './form-controls-tags.list';
import { isShowFieldsAction } from '../../../../core/actions/is-show-fields-action.function';
import { FieldSettings } from './field-settings.interface';

export class PaymentFormComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly formSpy: FormSpy;
  private readonly paymentFormFieldsManager: PaymentFormFieldsService;
  private readonly window: Window;

  private get elementRef(): HTMLElement {
    return this.querySelector('div')! as HTMLElement;
  }

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.formSpy = container.resolve(FormSpy);
    this.window = container.resolve(Window);
    this.paymentFormFieldsManager = container.resolve(PaymentFormFieldsService);
  }

  protected connectedCallback(): void {
    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
      return;
    }
    const formExpectedFields = this.formSpy.formFields;

    const formRequiredFields = this.getRequiredFields(this.formSpy.formFields);

    super.render();
    if (formExpectedFields) {
      this.setupFormLoader(formRequiredFields);

      const expectedFields = this.getFieldsSettings(formExpectedFields);
      const requiredFields = this.getFieldsSettings(formRequiredFields);
      const existsControls = this.getExistsControls();

      this.setupFormFields(expectedFields, requiredFields, existsControls);
      this.listenFormInit();
    }
  }

  protected getHtml(): string {
    return '<div></div>';
  }

  private listenFormInit(): void {
    this.headlessCheckout.form.onNextAction((nextAction) => {
      if (isShowFieldsAction(nextAction)) {
        this.formSpy.formFields = nextAction.data.fields;
        this.connectedCallback();
      }
    });
  }

  private setupFormFields(
    expectedFields: FieldSettings[],
    requiredFields: FieldSettings[],
    existsControls: FieldSettings[],
  ): void {
    const missedFields = getMissedFields(requiredFields, existsControls);
    this.setupMissedFields(missedFields);

    const invalidFields = getInvalidFields(expectedFields, existsControls);
    this.setupInvalidFields(invalidFields);
  }

  private setupMissedFields(missedFields: FieldSettings[]): void {
    this.paymentFormFieldsManager.createMissedFields(
      missedFields,
      this.elementRef,
    );
    this.logMissedFields(missedFields);
  }

  private setupInvalidFields(missedFields: FieldSettings[]): void {
    this.paymentFormFieldsManager.removeExtraFields(missedFields);
    this.paymentFormFieldsManager.removeEmptyNameFields();
    this.logExtraFields(missedFields);
  }

  private getRequiredFields(fields: Field[] = []): Field[] {
    return fields.filter((field) => field.isMandatory === '1');
  }

  private getFieldsSettings(fields: Field[]): FieldSettings[] {
    return fields.map((field) => ({ name: field.name, type: field.type }));
  }

  private getExistsControls(): FieldSettings[] {
    const existsControlsNames: FieldSettings[] = [];

    formControlsTags.forEach((tag: WebComponentTagName) => {
      const formInputs = this.window.document.querySelectorAll(tag);

      const controlsNames = Array.from(formInputs).map((formInput) =>
        formInput.getAttribute('name'),
      );

      controlsNames.forEach((name: string | null) => {
        const existField = this.formSpy.formFields?.find(
          (field) => field.name === name,
        );

        if (existField) {
          existsControlsNames.push({
            name: existField.name,
            type: existField.type,
          });
        }
      });
    });

    return existsControlsNames;
  }

  private logMissedFields(missedFields: FieldSettings[]): void {
    if (!missedFields.length) {
      return;
    }
    const message = `This fields were auto created: [${missedFields
      .map((field) => field.name)
      .join(', ')}]. They are mandatory for a payment flow`;
    console.warn(message);
    void this.headlessCheckout.events.send<{ message: string }>(
      { name: EventName.warning, data: { message } },
      () => null,
    );
  }

  private logExtraFields(extraFields: FieldSettings[]): void {
    if (!extraFields.length) {
      return;
    }
    const message = `This fields were auto removed: [${extraFields
      .map((field) => field.name)
      .join(', ')}]. They are useless for a payment flow`;
    console.warn(message);
    void this.headlessCheckout.events.send<{ message: string }>(
      { name: EventName.warning, data: { message } },
      () => null,
    );
  }

  private setupFormLoader(fields: Field[]): void {
    void this.formLoader.setupAndAwaitFieldsLoading(fields);
  }
}
