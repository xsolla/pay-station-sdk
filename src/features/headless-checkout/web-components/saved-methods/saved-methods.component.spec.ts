import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { HeadlessCheckout } from '../../headless-checkout';
import { SavedMethodsComponent } from './saved-methods.component';
import { SavedMethod } from '../../../../core/saved-method.interface';
import { EventName } from '../../../../core/event-name.enum';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';

function createComponent(isDeleteMode = false): void {
  const element = document.createElement(
    WebComponentTagName.SavedMethodsComponent,
  );
  if (isDeleteMode) {
    element.setAttribute('delete-mode', 'true');
  }

  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

const mockSavedMethod: SavedMethod = {
  type: 'card',
  id: 1,
  currency: 'RUB',
  name: '2222',
  pid: 1380,
  cardExpiryDate: {
    month: '05',
    year: '2030',
  },
  dateCreate: {
    date: '2025-01-01 00:00:00.000000',
    timezone: 'Europe/Moscow',
    timezone_type: 3,
  },
  dateLastCharge: 1743576779,
  recurrentType: 'charge',
  form: {
    paymentSid: 'id',
  },
  replaced: false,
  psName: 'Mastercard',
  isSelected: true,
  iconName: 'mastercard.svg',
  userEmail: 'amazing@user.com',
};

describe('SavedMethodsComponent', () => {
  let headlessCheckout: HeadlessCheckout;
  let headlessCheckoutSpy: HeadlessCheckoutSpy;
  let postMessagesClient: PostMessagesClient;

  window.customElements.define(
    WebComponentTagName.SavedMethodsComponent,
    SavedMethodsComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = {
      getSavedMethods: noopStub,
    } as unknown as HeadlessCheckout;

    headlessCheckoutSpy = {
      listenAppInit: noopStub,
      get appWasInit() {
        return;
      },
    } as unknown as HeadlessCheckoutSpy;
    postMessagesClient = {
      init: noopStub,
      send: noopStub,
      listen: noopStub,
    } as unknown as PostMessagesClient;

    container.clearInstances();

    container
      .register<HeadlessCheckoutSpy>(HeadlessCheckoutSpy, {
        useValue: headlessCheckoutSpy,
      })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout,
      })
      .register<Window>(Window, { useValue: window })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.SavedMethodsComponent),
    ).toBeDefined();
  });

  it('Should load saved methods', () => {
    const spy = spyOn(headlessCheckout, 'getSavedMethods').and.returnValue(
      Promise.resolve([]),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should load saved methods after init', () => {
    const spy = spyOn(headlessCheckout, 'getSavedMethods').and.returnValue(
      Promise.resolve([]),
    );
    const appWasInitSpy = spyOnProperty(
      headlessCheckoutSpy,
      'appWasInit',
      'get',
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

  it('Should not load saved methods', () => {
    const spy = spyOn(headlessCheckout, 'getSavedMethods').and.returnValue(
      Promise.resolve([]),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      false,
    );
    createComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should draw 2 payment methods', async () => {
    spyOn(headlessCheckout, 'getSavedMethods').and.returnValue(
      Promise.resolve([mockSavedMethod, mockSavedMethod]),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();

    // Для того, чтобы успели отрисоваться методы
    await Promise.resolve();
    expect(document.querySelectorAll('.saved-method')?.length).toBe(2);
  });

  it('Should draw no saved methods', async () => {
    spyOn(headlessCheckout, 'getSavedMethods').and.returnValue(
      Promise.resolve([]),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();

    await Promise.resolve();
    expect(document.querySelectorAll('.saved-method')?.length).toBe(0);
  });

  it('Should dispatch custom event', async () => {
    spyOn(headlessCheckout, 'getSavedMethods').and.returnValue(
      Promise.resolve([mockSavedMethod]),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();

    await Promise.resolve();
    document
      .querySelector(WebComponentTagName.SavedMethodsComponent)!
      .addEventListener(EventName.savedMethodSelected, (event) => {
        expect((event as CustomEvent).detail).toEqual({
          paymentMethodId: String(mockSavedMethod.pid),
          savedMethodId: String(mockSavedMethod.id),
          type: String(mockSavedMethod.type),
        });
      });

    document.querySelector('a')!.click();
  });

  it('Should dispatch custom delete event', async () => {
    spyOn(postMessagesClient, 'send').and.returnValue(Promise.resolve(true));

    spyOn(headlessCheckout, 'getSavedMethods').and.returnValue(
      Promise.resolve([mockSavedMethod]),
    );

    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );

    createComponent(true);

    await Promise.resolve();
    document
      .querySelector(WebComponentTagName.SavedMethodsComponent)!
      .addEventListener(EventName.deleteSavedMethod, (event) => {
        expect((event as CustomEvent).detail).toEqual({
          paymentMethodId: String(mockSavedMethod.pid),
          savedMethodId: String(mockSavedMethod.id),
          type: String(mockSavedMethod.type),
        });
      });

    document.querySelector('button')!.click();
  });
});
