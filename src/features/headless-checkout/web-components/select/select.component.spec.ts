import { container } from 'tsyringe';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { SelectAttributes } from './select-attributes.enum';
import { SelectComponent } from './select.component';

function createComponent(name: string): HTMLElement {
  const element = document.createElement(WebComponentTagName.SelectComponent);

  element.setAttribute(SelectAttributes.name, name);
  element.setAttribute('id', 'test');

  (document.getElementById('container')! as HTMLElement).appendChild(element);

  return element;
}

const configMock = {
  name: 'state',
  options: [
    {
      value: 'first',
      label: 'first-label',
    },
    {
      value: 'second',
      label: 'second-label',
    },
  ],
};

describe('SelectComponent', () => {
  let postMessagesClient: PostMessagesClient;
  let headlessCheckout: HeadlessCheckout;

  window.customElements.define(
    WebComponentTagName.SelectComponent,
    SelectComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    postMessagesClient = {
      send: noopStub,
    } as unknown as PostMessagesClient;

    headlessCheckout = {
      form: {
        onFieldsStatusChange: noopStub,
      },
    } as unknown as HeadlessCheckout;

    container.clearInstances();

    container
      .register(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register(HeadlessCheckout, {
        useValue: headlessCheckout,
      })
      .register(Window, {
        useValue: window,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    spyOn(postMessagesClient, 'send').and.resolveTo(configMock);

    createComponent('state');

    expect(
      document.querySelector(WebComponentTagName.SelectComponent),
    ).toBeDefined();
  });

  it('should render select with default option', (doneFn) => {
    const postMessageSpy = spyOn(postMessagesClient, 'send').and.resolveTo(
      configMock,
    );

    const selectComponent = createComponent('state');

    setTimeout(() => {
      const selectContentElement =
        selectComponent.querySelector('#select-content');

      expect(postMessageSpy).toHaveBeenCalled();
      expect(selectContentElement?.textContent?.replace(/\s/g, '')).toEqual(
        configMock.options[0].label,
      );

      doneFn();
    }, 0);
  });

  it('should render all options in dropdown', (doneFn) => {
    const postMessageSpy = spyOn(postMessagesClient, 'send').and.resolveTo(
      configMock,
    );

    const selectComponent = createComponent('state');

    setTimeout(() => {
      const selectOptionsElement =
        selectComponent.querySelector('#select-options');

      expect(postMessageSpy).toHaveBeenCalled();
      expect(selectOptionsElement?.children.length).toEqual(
        configMock.options.length,
      );

      doneFn();
    }, 0);
  });
});
