import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { TextComponent } from './text.component';

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.TextComponent);
  element.setAttribute('name', 'zip');
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('HeadlessCheckout', () => {
  window.customElements.define(
    WebComponentTagName.TextComponent,
    TextComponent
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should web component rendered', () => {
    createComponent();

    expect(document.querySelector('iframe')).toBeDefined();
    expect(document.getElementsByClassName('label')).toBeDefined();
  });
});
