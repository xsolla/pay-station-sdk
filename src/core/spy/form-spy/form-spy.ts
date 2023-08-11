import { singleton } from 'tsyringe';
import { Field } from '../../form/field.interface';

@singleton()
export class FormSpy {
  private _formWasInit = false;
  private _fields?: Field[];
  private readonly _callbacks: Array<() => void> = [];

  public set formWasInit(value: boolean) {
    this._formWasInit = value;
    if (value) {
      this.formWasInitHandler();
    }
  }

  public get formWasInit(): boolean {
    return this._formWasInit;
  }

  public set formFields(fields: Field[] | undefined) {
    this._fields = fields;
  }

  public get formFields(): Field[] | undefined {
    return this._fields;
  }

  public listenFormInit(callback: () => void): void {
    this._callbacks.push(callback);
  }

  private formWasInitHandler(): void {
    this._callbacks.forEach((callback) => callback());
  }
}
