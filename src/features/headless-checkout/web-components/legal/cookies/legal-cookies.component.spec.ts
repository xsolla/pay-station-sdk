import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckoutSpy } from '../../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { noopStub } from '../../../../../tests/stubs/noop.stub';
import { EventName } from '../../../../../core/event-name.enum';
import { LegalCookiesComponent } from './legal-cookies.component';
import { tick } from '../../../../../tests/stubs/tick';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.LegalCookiesComponent,
  );
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('LegalCookiesComponent', () => {
  let headlessCheckoutSpy: HeadlessCheckoutSpy;
  let windowService: Window;

  window.customElements.define(
    WebComponentTagName.LegalCookiesComponent,
    LegalCookiesComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckoutSpy = {
      listenAppInit: noopStub,
      get appWasInit() {
        return;
      },
    } as unknown as HeadlessCheckoutSpy;

    windowService = window;

    container.clearInstances();

    container
      .register<HeadlessCheckoutSpy>(HeadlessCheckoutSpy, {
        useValue: headlessCheckoutSpy,
      })
      .register<Window>(Window, { useValue: windowService });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.LegalCookiesComponent),
    ).toBeDefined();
  });

  it('Should call addEventListener', async () => {
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    const spy = spyOn(windowService, 'addEventListener');
    createComponent();
    await tick();
    expect(spy).toHaveBeenCalled();
  });

  it('Should send pong message', async () => {
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    spyOn(windowService, 'addEventListener').and.callFake(
      (name: string, callback: (event: unknown) => void) => {
        const messageEvent = {
          data: JSON.stringify({
            name: EventName.requiredComponentPing,
            data: { componentName: 'LegalCookiesComponent' },
          }),
          origin: '',
          source: {
            postMessage: noopStub,
          },
        };
        const spy = spyOn(messageEvent.source, 'postMessage');
        callback(messageEvent);
        expect(spy).toHaveBeenCalled();
      },
    );
    createComponent();
    await tick();
  });
});
