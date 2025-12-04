import { EventName } from '../../../../core/event-name.enum';

import { getCardNumberComponentTemplate } from './card-number.template';
import { updateCreditCardTypeHandler } from '../../post-messages-handlers/update-credit-card-type.handler';
import { cardIconsMap } from './card-icons.map';
import { CardType } from './card-type.enum';
import { CardNumberComponentAttributes } from './card-number-component-attributes.enum';
import { TextComponent } from '../text-component/text.component';
import './card-number.component.scss';
import { updateCardBinCountryHandler } from '../../post-messages-handlers/update-card-bin-country.handler';

export class CardNumberComponent extends TextComponent {
  private cardType = 'default';

  private isCardIconShown = true;
  private readonly subscriptions: Array<() => void> = [];

  public static get observedAttributes(): string[] {
    return [
      CardNumberComponentAttributes.name,
      CardNumberComponentAttributes.icon,
    ];
  }

  protected connectedCallback(): void {
    super.connectedCallback();

    this.subscriptions.push(
      this.postMessagesClient.listen<{ cardType: string }>(
        EventName.updateCreditCardType,
        updateCreditCardTypeHandler,
        (res) => {
          if (this.isCardIconShown && this.cardType !== res?.cardType) {
            this.cardType = res?.cardType ? res.cardType : 'default';
            this.updateCardIcon(this.cardType);
          }
        },
      ),
    );

    this.subscriptions.push(
      this.postMessagesClient.listen<{ cardBinCountry?: string }>(
        EventName.sendCardBinCountry,
        updateCardBinCountryHandler,
        (res) => {
          if (!res?.cardBinCountry) {
            return;
          }

          const eventOptions = {
            bubbles: true,
            composed: true,
            detail: {
              cardBinCountry: res.cardBinCountry,
            },
          };

          this.dispatchEvent(
            new CustomEvent(EventName.cardBinCountryChanged, eventOptions),
          );
        },
      ),
    );
  }

  protected disconnectedCallback(): void {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
  }

  protected attributeChangedCallback(): void {
    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => {
        super.attributeChangedCallback();
        this.toggleCardIconVisibility();
      });
      return;
    }
  }

  protected getHtml(): string {
    const secureHtml = this.getSecureHtml();
    return getCardNumberComponentTemplate({
      title: this.config?.title,
      error: this.config?.error,
      isCardIconShown: this.isCardIconShown,
      secureHtml,
    });
  }

  private updateCardIcon(iconName: string): void {
    const rootElement = this.shadowRoot ?? this;

    const iconWrapperElement = rootElement.querySelector('.card-icon');

    const iconElement = iconWrapperElement!.querySelector(
      '.icon',
    ) as HTMLImageElement | null;

    const cardIcon =
      cardIconsMap[iconName as CardType] ?? cardIconsMap[CardType.DEFAULT_CARD];
    if (!iconElement) {
      const newIconElement = this.window.document.createElement('img');
      newIconElement.width = 24;
      newIconElement.height = 18;
      newIconElement.classList.add('icon');
      newIconElement.src = cardIcon;
      iconWrapperElement!.appendChild(newIconElement);
    } else {
      iconElement.src = cardIcon;
    }
  }

  private toggleCardIconVisibility(): void {
    const isCardIconShownAttr = this.getAttribute(
      CardNumberComponentAttributes.icon,
    );

    if (!isCardIconShownAttr) {
      this.isCardIconShown = true;
      return;
    }

    this.isCardIconShown = isCardIconShownAttr === 'true';
  }
}
