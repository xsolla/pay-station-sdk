import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { Field } from '../../../../core/form/field.interface';
import { HeadlessCheckout } from '../../headless-checkout';
import { EventName } from '../../../../core/event-name.enum';
import { getMissedFieldsNames } from './get-missed-fields-names.function';
import { getInvalidFieldsNames } from './get-invalid-fields-names.function';
import { PaymentFormFieldsService } from './payment-form-fields.service';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { formControlsTags } from './form-controls-tags.list';

export class PaymentFormComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly formSpy: FormSpy;
  private readonly paymentFormFieldsManager: PaymentFormFieldsService;

  private formExpectedFields?: Field[];
  private readonly window: Window;
  private existsControlsNames?: Array<string | null>;
  private expectedFieldsNames!: string[];
  private missedFieldsNames!: string[];
  private invalidFieldsNames!: string[];

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
    this.formExpectedFields = this.formSpy.formFields;

    super.render();
    if (this.formExpectedFields) {
      this.expectedFieldsNames = this.getExpectedControlsNames(
        this.formExpectedFields
      );
      this.existsControlsNames = this.getExistsControlsNames();

      this.setupFormFields(this.expectedFieldsNames, this.existsControlsNames);
    }
  }

  protected getHtml(): string {
    return '<div></div>';
  }

  private setupFormFields(
    expectedFieldsNames: string[],
    existsControlsNames: Array<string | null>
  ): void {
    this.missedFieldsNames = getMissedFieldsNames(
      expectedFieldsNames,
      existsControlsNames
    );
    this.setupMissedFields(this.missedFieldsNames);

    this.invalidFieldsNames = getInvalidFieldsNames(
      expectedFieldsNames,
      existsControlsNames
    );
    this.setupInvalidFields(this.invalidFieldsNames);
  }
  private setupMissedFields(missedFieldsNames: string[]): void {
    this.paymentFormFieldsManager.createMissedFields(
      missedFieldsNames,
      this.elementRef
    );
    this.logMissedFields(missedFieldsNames);
  }

  private setupInvalidFields(missedFieldsNames: string[]): void {
    this.paymentFormFieldsManager.removeExtraFields(missedFieldsNames);
    this.paymentFormFieldsManager.removeEmptyNameFields();
    this.logExtraFields(missedFieldsNames);
  }

  private getExpectedControlsNames(fields: Field[]): string[] {
    return fields.map((field) => field.name);
  }

  private getExistsControlsNames(): Array<string | null> {
    const existsControlsNames: Array<string | null> = [];

    formControlsTags.forEach((tag: WebComponentTagName) => {
      const formInputs = this.window.document.querySelectorAll(tag);

      const controlsNames = Array.from(formInputs).map((formInput) =>
        formInput.getAttribute('name')
      );

      controlsNames.forEach((name: string | null) =>
        existsControlsNames.push(name)
      );
    });

    return existsControlsNames;
  }

  private logMissedFields(missedFieldsNames: string[]): void {
    if (!missedFieldsNames.length) {
      return;
    }
    const message = `This fields were auto created: [${missedFieldsNames.join(
      ', '
    )}]. They are mandatory for a payment flow`;
    console.warn(message);
    void this.headlessCheckout.events.send<{ message: string }>(
      { name: EventName.warning, data: { message } },
      () => null
    );
  }

  private logExtraFields(extraFieldsNames: Array<string | null>): void {
    if (!extraFieldsNames.length) {
      return;
    }
    const message = `This fields were auto removed: [${extraFieldsNames.join(
      ', '
    )}]. They are useless for a payment flow`;
    console.warn(message);
    void this.headlessCheckout.events.send<{ message: string }>(
      { name: EventName.warning, data: { message } },
      () => null
    );
  }
}
