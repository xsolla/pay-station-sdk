import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { CashPaymentData } from '../../../../core/cash-payment-data.interface';
import { CashPaymentInstructionComponent } from './cash-payment-instruction.component';
import { tick } from '../../../../tests/stubs/tick';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.CashPaymentInstructionComponent,
  );
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

const cashPaymentData = {
  isCashPaymentMethod: false,
} as CashPaymentData;

describe('CashPaymentInstructionComponent', () => {
  let formSpy: FormSpy;
  let postMessagesClient: PostMessagesClient;

  window.customElements.define(
    WebComponentTagName.CashPaymentInstructionComponent,
    CashPaymentInstructionComponent,
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

    container.clearInstances();

    container
      .register<FormSpy>(FormSpy, {
        useValue: formSpy,
      })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<Window>(Window, { useValue: window });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should draw cash payment component', () => {
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.returnValue(Promise.resolve(null));
    createComponent();
    expect(
      document.querySelector(
        WebComponentTagName.CashPaymentInstructionComponent,
      )!.innerHTML,
    ).not.toContain(WebComponentTagName.XsollaNumberComponent);
  });

  it('Should draw XsollaNumberComponent', async () => {
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve(cashPaymentData),
    );
    createComponent();
    const delay = 100;
    await tick(delay);
    expect(
      document.querySelector(
        WebComponentTagName.CashPaymentInstructionComponent,
      )!.innerHTML,
    ).toContain(WebComponentTagName.XsollaNumberComponent);
  });

  it('Should draw cash-payment-instruction', async () => {
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve({ isCashPaymentMethod: true } as CashPaymentData),
    );
    createComponent();
    const delay = 100;
    await tick(delay);
    expect(
      document.querySelector(
        WebComponentTagName.CashPaymentInstructionComponent,
      )!.innerHTML,
    ).toContain('cash-payment-instruction');
  });
});
