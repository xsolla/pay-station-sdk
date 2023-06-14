import 'reflect-metadata';
import { container } from 'tsyringe';
import { HeadlessCheckoutSpy } from './headless-checkout-spy';

class Observer {
  public appInitHandler(): void {
    return;
  }
}

describe('HeadlessCheckoutSpy', () => {
  let headlessCheckoutSpy: HeadlessCheckoutSpy;

  beforeEach(() => {
    container.clearInstances();
    headlessCheckoutSpy = container
      .createChildContainer()
      .resolve(HeadlessCheckoutSpy);
  });

  it('Should return true for init app state', () => {
    headlessCheckoutSpy.appWasInit = true;
    expect(headlessCheckoutSpy.appWasInit).toBeTrue();
  });

  it('Should call appWasInitHandler', () => {
    const observer = new Observer();
    const spy = spyOn(observer, 'appInitHandler');
    headlessCheckoutSpy.listenAppInit(observer.appInitHandler);
    headlessCheckoutSpy.appWasInit = true;
    expect(spy).toHaveBeenCalled();
  });

  it('Should call appWasInitHandler once', () => {
    const observer = new Observer();
    const spy = spyOn(observer, 'appInitHandler');
    headlessCheckoutSpy.listenAppInit(observer.appInitHandler);
    headlessCheckoutSpy.appWasInit = true;
    headlessCheckoutSpy.appWasInit = true;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Should call appWasInitHandler once', () => {
    const observer = new Observer();
    const spy = spyOn(observer, 'appInitHandler');
    headlessCheckoutSpy.listenAppInit(observer.appInitHandler);
    headlessCheckoutSpy.appWasInit = true;
    headlessCheckoutSpy.appWasInit = false;
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
