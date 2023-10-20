import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { PaymentMethodsComponent } from './payment-methods.component';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { PaymentMethodsAttributes } from './payment-methods-attributes.enum';
import { PaymentMethod } from '../../../../core/payment-method.interface';
import { PaymentMethodsEvents } from './payment-methods-events.enum';
import { HeadlessCheckout } from '../../headless-checkout';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.PaymentMethodsComponent
  );
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

const mockVisiblePaymentMethod = {
  id: 1,
  name: '1',
  isVisible: true,
} as PaymentMethod;

const mockQiwiPaymentMethod = {
  id: 16,
  name: 'qiwi',
  isVisible: true,
} as PaymentMethod;

const mockNotVisiblePaymentMethod = {
  id: 1,
  name: '1',
  isVisible: false,
} as PaymentMethod;

describe('PaymentMethodsComponent', () => {
  let headlessCheckout: HeadlessCheckout;
  let headlessCheckoutSpy: HeadlessCheckoutSpy;

  window.customElements.define(
    WebComponentTagName.PaymentMethodsComponent,
    PaymentMethodsComponent
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = {
      getRegularMethods: noopStub,
    } as unknown as HeadlessCheckout;

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
        useValue: headlessCheckout,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.PaymentMethodsComponent)
    ).toBeDefined();
  });

  it('Should load payment methods', () => {
    const spy = spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true
    );
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should load payment methods after init', () => {
    const spy = spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([])
    );
    const appWasInitSpy = spyOnProperty(
      headlessCheckoutSpy,
      'appWasInit',
      'get'
    );
    const listenAppInitSpy = spyOn(headlessCheckoutSpy, 'listenAppInit');
    listenAppInitSpy.and.callFake((callback: () => void) => {
      appWasInitSpy.and.returnValue(true);
      callback();
    });
    appWasInitSpy.and.returnValue(false);
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should not load payment methods', () => {
    const spy = spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      false
    );
    createComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should load payment methods twice if change country', () => {
    const spy = spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true
    );
    createComponent();
    document
      .querySelector(WebComponentTagName.PaymentMethodsComponent)!
      .setAttribute(PaymentMethodsAttributes.country, 'RU');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('Should draw 2 payment methods', async () => {
    spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([mockVisiblePaymentMethod, mockVisiblePaymentMethod])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true
    );
    createComponent();

    // Для того, чтобы успели отрисоваться методы
    await Promise.resolve();
    expect(document.querySelectorAll('.payment-method')?.length).toBe(2);
  });

  it('Should draw 1 payment methods', async () => {
    spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([mockNotVisiblePaymentMethod, mockVisiblePaymentMethod])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true
    );
    createComponent();

    await Promise.resolve();
    expect(document.querySelectorAll('.payment-method')?.length).toBe(1);
  });

  it('Should draw no payment methods', async () => {
    spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([
        mockNotVisiblePaymentMethod,
        mockNotVisiblePaymentMethod,
      ])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true
    );
    createComponent();

    await Promise.resolve();
    expect(document.querySelectorAll('.payment-method')?.length).toBe(0);
  });

  it('Should dispatch custom event', async () => {
    spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([mockVisiblePaymentMethod])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true
    );
    createComponent();

    await Promise.resolve();
    document
      .querySelector(WebComponentTagName.PaymentMethodsComponent)!
      .addEventListener(PaymentMethodsEvents.selectionChange, (event) => {
        expect((event as CustomEvent).detail).toEqual({
          paymentMethodId: String(mockVisiblePaymentMethod.id),
        });
      });

    document.querySelector('a')!.click();
  });

  it('Should search methods', async () => {
    spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([mockVisiblePaymentMethod, mockQiwiPaymentMethod])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true
    );
    createComponent();

    await Promise.resolve();
    const searchInputElement = document.querySelector('input');
    searchInputElement!.value = mockQiwiPaymentMethod.name;
    const event = new Event('input', { bubbles: true });
    searchInputElement!.dispatchEvent(event);
    await Promise.resolve();
    expect(document.querySelectorAll('.payment-method')?.length).toBe(1);
  });

  it('Should draw no methods', async () => {
    spyOn(headlessCheckout, 'getRegularMethods').and.returnValue(
      Promise.resolve([mockVisiblePaymentMethod, mockQiwiPaymentMethod])
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true
    );
    createComponent();

    await Promise.resolve();
    const searchInputElement = document.querySelector('input');
    searchInputElement!.value = '123';
    const event = new Event('input', { bubbles: true });
    searchInputElement!.dispatchEvent(event);
    await Promise.resolve();
    expect(document.querySelectorAll('.payment-method')?.length).toBe(0);
  });
});
