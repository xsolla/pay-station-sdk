import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { HeadlessCheckoutMock } from '../../../../tests/stubs/headless-checkout.mock';
import { HeadlessCheckout } from '../../headless-checkout';
import { StatusComponent } from './status.component';
import { Status } from '../../../../core/status/status.interface';

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.StatusComponent);
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('StatusComponent', () => {
  let headlessCheckout: HeadlessCheckoutMock<string[]>;
  let headlessCheckoutSpy: HeadlessCheckoutSpy;

  window.customElements.define(
    WebComponentTagName.StatusComponent,
    StatusComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = new HeadlessCheckoutMock<string[]>();
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
      document.querySelector(WebComponentTagName.StatusComponent),
    ).toBeDefined();
  });

  it('Should get status', () => {
    const spy = spyOn(headlessCheckout, 'getStatus');
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should not draw for empty form messages event', () => {
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    headlessCheckout.emitEvent(null);
    const element = document.querySelector(WebComponentTagName.StatusComponent);
    expect(element!.innerHTML).toEqual('');
  });

  it('Should draw status component', async () => {
    const mockStatus: Status = {
      statusState: 'done',
    } as unknown as Status;
    spyOn(headlessCheckout, 'getStatus').and.returnValue(
      Promise.resolve(mockStatus),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    // delay the template to be drawn
    await Promise.resolve();

    const element = document.querySelector(WebComponentTagName.StatusComponent);
    expect(element!.innerHTML).not.toEqual('');
  });
});
