import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../../core/web-components/web-component-tag-name.enum';
import { GooglePayButtonComponent } from '../../../../../web-components';
import { noopStub } from '../../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../../core/spy/form-spy/form-spy';
import { HeadlessCheckout } from '../../../headless-checkout';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.GooglePayButtonComponent,
  );
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('GooglePayButtonComponent', () => {
  let headlessCheckout: HeadlessCheckout;
  let formSpy: FormSpy;

  window.customElements.define(
    WebComponentTagName.GooglePayButtonComponent,
    GooglePayButtonComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = {
      events: {
        onCoreEvent: () => noopStub,
      },
    } as unknown as HeadlessCheckout;

    formSpy = {
      listenFormInit: noopStub,
      get formWasInit() {
        return true;
      },
    } as unknown as FormSpy;

    container.clearInstances();
    container.registerInstance(HeadlessCheckout, headlessCheckout);
    container.registerInstance(FormSpy, formSpy);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    container.clearInstances();
  });

  it('Should create iframe', () => {
    createComponent();

    const iframe = document.querySelector('iframe');

    expect((iframe as HTMLElement).getAttribute('src')).toContain(
      'google-pay-button',
    );
  });
});
