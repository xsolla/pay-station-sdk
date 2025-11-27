import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { CheckoutForm } from '../../../../core/actions/three-ds/checkout-form.interface';
import { ThreeDsComponent } from './three-ds.component';
import createSpy = jasmine.createSpy;

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.ThreeDsComponent);

  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

function get3dsComponent(): ThreeDsComponent {
  return document.querySelector(
    WebComponentTagName.ThreeDsComponent,
  ) as unknown as ThreeDsComponent;
}

describe('ThreeDsComponent', () => {
  let windowService: Window;

  window.customElements.define(
    WebComponentTagName.ThreeDsComponent,
    ThreeDsComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    windowService = {
      document: {
        createElement: noopStub,
      },
      open: noopStub,
    } as unknown as Window;

    container.clearInstances();

    container.register<Window>(Window, {
      useValue: windowService,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.ThreeDsComponent),
    ).toBeDefined();
  });

  it('should open 3ds window', () => {
    const submitSpy = createSpy('submitSpy');

    const formElement = window.document.createElement('form');
    formElement.submit = submitSpy;
    const inputElement = window.document.createElement('input');

    const challengeForm = {
      action: 'GET',
      method: 'method',
      params: {
        foo: 'bar',
      },
      redirect: {
        isNewWindowRequired: false,
        isSameWindowRequired: true,
      },
    } as CheckoutForm;

    const createElementSpy = spyOn(
      windowService.document,
      'createElement',
    ).and.callFake((tagName: string) => {
      if (tagName === 'form') {
        return formElement;
      }

      return inputElement;
    });
    const windowOpenSpy = spyOn(windowService, 'open').and.stub();

    createComponent();

    const threeDsComponent = get3dsComponent();
    threeDsComponent.setAttribute(
      'data-challenge',
      JSON.stringify(challengeForm),
    );

    expect(createElementSpy).toHaveBeenCalledTimes(2);
    expect(windowOpenSpy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalled();
  });
});
