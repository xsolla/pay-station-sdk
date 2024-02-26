import { WebComponentTagName } from '../../../../../core/web-components/web-component-tag-name.enum';
import { GooglePayButtonComponent } from '../../../../../web-components';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.GooglePayButtonComponent,
  );
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('GooglePayButtonComponent', () => {
  window.customElements.define(
    WebComponentTagName.GooglePayButtonComponent,
    GooglePayButtonComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create iframe', () => {
    createComponent();

    const iframe = document.querySelector('iframe');

    expect((iframe as HTMLElement).getAttribute('src')).toContain(
      'google-pay-button',
    );
  });
});
