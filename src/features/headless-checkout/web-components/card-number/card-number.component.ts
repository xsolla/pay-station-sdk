import { EventName } from '../../../../core/event-name.enum';
import { updateCreditCardTypeHandler } from '../../post-messages-handlers/update-credit-card-type.handler';
import { cardIconsMap } from './card-icons.map';
import { CardType } from './card-type.enum';
import { CardNumberComponentAttributes } from './card-number-component-attributes.enum';
import './card-number.component.scss';
import { property, customElement } from 'lit/decorators.js';
import { TextComponent } from '../text-component/text.component';
import { html, TemplateResult } from 'lit';

@customElement('psdk-card-number')
export class CardNumberComponent extends TextComponent {
  @property({ attribute: false })
  private cardType = 'default';

  @property({ type: Boolean, attribute: CardNumberComponentAttributes.icon })
  private readonly isCardIconShown = false;

  public connectedCallback(): void {
    super.connectedCallback();

    this.postMessagesClient.listen<{ cardType: string }>(
      EventName.updateCreditCardType,
      updateCreditCardTypeHandler,
      (res) => {
        if (this.isCardIconShown && this.cardType !== res?.cardType) {
          this.cardType = res?.cardType ? res.cardType : 'default';
        }
      },
    );
  }

  protected render(): TemplateResult<1> {
    if (!this.formSpy.formWasInit || !this.componentName) {
      return html``;
    }

    const textComponentTemplate = this.getTextComponentTemplate(
      this.getCardIconTemplate(),
    );

    return html`${textComponentTemplate}`;
  }

  private getCardIconTemplate(): TemplateResult<1> | null {
    const cardIcon =
      cardIconsMap[this.cardType as CardType] ??
      cardIconsMap[CardType.DEFAULT_CARD];

    return this.isCardIconShown
      ? html`<span class="card-icon">
          <img width="24" height="18" class="icon" src="${cardIcon}" />
        </span>`
      : null;
  }
}
