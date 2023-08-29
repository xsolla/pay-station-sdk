import { container } from 'tsyringe';
import { CurrencyPipe } from '../../../../../core/pipes/currency/currency.pipe';
import { WebComponentTagName } from '../../../../../core/web-components/web-component-tag-name.enum';
import { PriceTextComponent } from './price-text.component';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.PriceTextComponent,
  );

  element.setAttribute('price-line-content', 'content');
  element.setAttribute('price-line-amount', '1');
  element.setAttribute('price-line-currency', 'USD');
  element.setAttribute('amount', '10');
  element.setAttribute('currency', 'USD');

  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('PriceTextComponent', () => {
  window.customElements.define(
    WebComponentTagName.PriceTextComponent,
    PriceTextComponent,
  );

  const currencyPipe = { transform: () => '' } as unknown as CurrencyPipe;

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    container.clearInstances();

    container.register<CurrencyPipe>(CurrencyPipe, { useValue: currencyPipe });
    spyOn(container, 'resolve').and.returnValue(currencyPipe);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should draw price content', () => {
    createComponent();
    expect(document.querySelector('.content')!.textContent).toContain(
      'content',
    );
  });

  it('Should draw price ', () => {
    createComponent();
    expect(document.querySelector('.price')).not.toBeNull();
  });
});
