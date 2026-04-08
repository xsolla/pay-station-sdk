import { singleton } from 'tsyringe';
import { Field } from './field.interface';
import { FieldsType } from './fields-type.enum';

@singleton()
export class FormLoader {
  private _fields!: { [key: string]: boolean };
  private _isAllFieldsLoaded!: Promise<void>;

  private _resolve!: () => void;
  private _isPromiseResolved = false;
  private _onLoadedCallbacks: Array<() => void> = [];

  public async setupAndAwaitFieldsLoading(fields: Field[]): Promise<void> {
    this._isAllFieldsLoaded = new Promise((resolve) => {
      this._resolve = () => {
        resolve();
      };
    });

    this._isPromiseResolved = false;
    this._fields = {};

    const filteredFields = this.filterFields(fields);

    const isFormWithoutFields = !filteredFields.length;

    if (isFormWithoutFields) {
      this._resolve();
      this._isPromiseResolved = true;
      this.notifyOnLoaded();
    }

    filteredFields.forEach((field) => {
      this._fields[field.name] = false;
    });

    return this._isAllFieldsLoaded;
  }

  public onceLoaded(callback: () => void): void {
    this._onLoadedCallbacks.push(callback);
  }

  public setFieldLoaded(name: string): void {
    if (!this._fields) {
      return;
    }

    if (name in this._fields) {
      this._fields[name] = true;
    }

    if (this.isAllFieldsLoaded && !this._isPromiseResolved) {
      this._resolve();
      this._isPromiseResolved = true;
      this.notifyOnLoaded();
    }
  }

  private notifyOnLoaded(): void {
    this._onLoadedCallbacks.forEach((callback) => callback());
    this._onLoadedCallbacks = [];
  }

  public get hasTrackedFields(): boolean {
    return !!this._fields && Object.keys(this._fields).length > 0;
  }

  private get isAllFieldsLoaded(): boolean {
    return Object.values(this._fields).every((value) => value);
  }

  private filterFields(fields: Field[]): Field[] {
    return fields.filter((field) => {
      const isTextControl = field.type === FieldsType.text;
      const isCheckboxControl = field.type === FieldsType.check;
      const isSelectControl = field.type === FieldsType.select;
      const isQrCodeControl = field.name === 'qr';

      return (
        isTextControl || isCheckboxControl || isSelectControl || isQrCodeControl
      );
    });
  }
}
