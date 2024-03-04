import { container } from 'tsyringe';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { HeadlessCheckout } from '../../headless-checkout';
import { QrCodeComponent } from './qr-code.component';

class HeadlessCheckoutMock {
  public events = {
    onCoreEvent: noopStub,
  };
}

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.QrCodeComponent);

  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('QrCodeComponent', () => {
  let headlessCheckout: HeadlessCheckoutMock;
  let headlessCheckoutSpy: HeadlessCheckoutSpy;

  window.customElements.define(
    WebComponentTagName.QrCodeComponent,
    QrCodeComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = new HeadlessCheckoutMock();
    headlessCheckoutSpy = {
      listenAppInit: noopStub,
      get appWasInit() {
        return;
      },
    } as unknown as HeadlessCheckoutSpy;

    container.clearInstances();

    container
      .register<HeadlessCheckoutSpy>(HeadlessCheckoutSpy, {
        useValue: headlessCheckoutSpy,
      })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout as unknown as HeadlessCheckout,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.QrCodeComponent),
    ).not.toBeNull();
  });
});
