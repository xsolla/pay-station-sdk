import { CommonLogAttributes } from './common-log-attributes.interface';
import { singleton } from 'tsyringe';

@singleton()
export class CommonLogAttributesService {
  private attributes: CommonLogAttributes | null = null;

  public setAttributes(attributes: Partial<CommonLogAttributes>): void {
    this.attributes = {
      ...this.attributes,
      ...attributes,
    };
  }

  public getAttributes(): CommonLogAttributes {
    return this.attributes ?? {};
  }
}
