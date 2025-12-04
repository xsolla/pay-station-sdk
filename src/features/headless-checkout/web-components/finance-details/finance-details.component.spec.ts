import { container } from 'tsyringe';
import { Currency } from '../../../../core/currency/currency.enum';
import { FinanceDetails } from '../../../../core/finance-details/finance-details.interface';
import { Handler } from '../../../../core/post-messages-client/handler.type';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { HeadlessCheckout } from '../../headless-checkout';
import { FinanceDetailsComponent } from './finance-details.component';

class HeadlessCheckoutMock {
  public events = {
    onCoreEvent: (
      name: string,
      handler: Handler<string>,
      callback: (value: FinanceDetails | null) => void,
    ) => {
      this.addEventListener(callback);
    },
  };
  private readonly listenerts: Array<(value: FinanceDetails | null) => void> =
    [];

  public addEventListener(
    callback: (value: FinanceDetails | null) => void,
  ): void {
    this.listenerts.push(callback);
  }

  public emitEvent(value: FinanceDetails | null): void {
    this.listenerts.forEach((callback) => callback(value));
  }
}

const financeDetails = {
  finance: {},
  cartItems: [],
  cartSummary: {
    total: {
      money: {
        amount: 1,
        currency: Currency.USD,
      },
    },
  },
} as unknown as FinanceDetails;

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.FinanceDetailsComponent,
  );

  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('FinanceDetailsComponent', () => {
  let headlessCheckout: HeadlessCheckoutMock;
  let headlessCheckoutSpy: HeadlessCheckoutSpy;

  window.customElements.define(
    WebComponentTagName.FinanceDetailsComponent,
    FinanceDetailsComponent,
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
      document.querySelector(WebComponentTagName.FinanceDetailsComponent),
    ).not.toBeNull();
  });

  it('Should subscribe to finance details event', () => {
    const spy = spyOn(headlessCheckout.events, 'onCoreEvent');
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should not draw for empty finance details event', () => {
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    headlessCheckout.emitEvent(null);
    const element = document.querySelector(
      WebComponentTagName.FinanceDetailsComponent,
    );
    expect(element!.innerHTML).toEqual('');
  });

  it('Should draw on finance details event', () => {
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    headlessCheckout.emitEvent(financeDetails as unknown as FinanceDetails);
    expect(
      document.querySelector(WebComponentTagName.FinanceDetailsComponent),
    ).not.toBeNull();
  });
});
