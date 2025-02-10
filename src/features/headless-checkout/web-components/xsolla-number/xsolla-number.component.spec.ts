import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { CashPaymentData } from '../../../../core/cash-payment-data.interface';
import { tick } from '../../../../tests/stubs/tick';
import { XsollaNumberComponent } from './xsolla-number.component';
import { HeadlessCheckoutMock } from '../../../../tests/stubs/headless-checkout.mock';
import { HeadlessCheckout } from '../../headless-checkout';
import { EventName } from '../../../../core/event-name.enum';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.XsollaNumberComponent,
  );
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

const cashPaymentData = {
  isCashPaymentMethod: false,
  xsollaNumber: '123',
  pid: 19,
  publicId: 'mock_publicId',
  title: 'mock_title',
  projectName: 'mock_projectName',
  printUrl: 'mock_printUrl',
} as CashPaymentData;

describe('XsollaNumberComponent', () => {
  let formSpy: FormSpy;
  let postMessagesClient: PostMessagesClient;
  let headlessCheckout: HeadlessCheckoutMock<string[]>;

  window.customElements.define(
    WebComponentTagName.XsollaNumberComponent,
    XsollaNumberComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    postMessagesClient = {
      init: noopStub,
      send: noopStub,
      listen: noopStub,
    } as unknown as PostMessagesClient;

    formSpy = {
      listenFormInit: noopStub,
      get formWasInit() {
        return;
      },
    } as unknown as FormSpy;

    headlessCheckout = new HeadlessCheckoutMock();

    container.clearInstances();

    container
      .register<FormSpy>(FormSpy, {
        useValue: formSpy,
      })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<Window>(Window, { useValue: window })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout as unknown as HeadlessCheckout,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should draw cash payment component', async () => {
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve(cashPaymentData),
    );
    createComponent();
    const delay = 100;
    await tick(delay);
    const innerHtml = document.querySelector(
      WebComponentTagName.XsollaNumberComponent,
    )!.innerHTML;
    expect(innerHtml).toContain('payment-title');
    expect(innerHtml).toContain('payment-info');
    expect(innerHtml).toContain('instruction-wrapper');
    expect(innerHtml).toContain('send-xsolla-number-panel');
  });

  it('Should draw notification', (done) => {
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve(cashPaymentData),
    );
    spyOn(headlessCheckout.events, 'onCoreEvent').and.callFake((...args) => {
      const eventName = args[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const callback: (value?: unknown) => void = args[2];
      setTimeout(() => {
        if (eventName === EventName.sendCashPaymentDataStatus) {
          callback({ status: 'succeed', type: 'sms', error: [] });
          expect(
            document.querySelector(WebComponentTagName.XsollaNumberComponent)!
              .innerHTML,
          ).toContain('send-notification');
          done();
        }
      });
      return noopStub;
    });

    createComponent();
  });
});
