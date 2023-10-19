import { BaseControl } from '../base-control/base-control.abstract';
import { SelectAttributes } from './select-attributes.enum';
import { getSelectComponentTemplate } from './select.template';
import { ControlComponentConfig } from '../control-component-config.interface';

export class SelectComponent extends BaseControl {
  private config: ControlComponentConfig | null = null;

  public constructor() {
    super();
  }

  public get nameAttr(): string {
    return this.getAttribute(SelectAttributes.name) ?? '';
  }

  public static get observedAttributes(): string[] {
    return [SelectAttributes.name];
  }

  protected connectedCallback(): void {
    this.controlName = this.nameAttr;

    if (!this.controlName) {
      return;
    }

    void this.getComponentConfig(this.controlName).then((config) => {
      this.config = config;

      this.render();
    });
  }

  protected attributeChangedCallback(): void {
    if (!this.controlName) {
      return this.connectedCallback();
    }

    super.attributeChangedCallback();
  }

  protected getHtml(): string {
    console.info('select config', this.config);

    return getSelectComponentTemplate();
  }
}
