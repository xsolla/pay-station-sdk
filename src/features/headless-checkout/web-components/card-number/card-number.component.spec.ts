import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { CardNumberComponent } from './card-number.component';

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.CardNumberComponent);
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('HeadlessCheckout', () => {
  window.customElements.define(WebComponentTagName.CardNumberComponent, CardNumberComponent);

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Should web component rendered', () => {
    createComponent();

    expect(document.querySelector('iframe')).toBeDefined();
    expect(document.getElementsByClassName('label')).toBeDefined();
  });
});
