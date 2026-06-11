import 'reflect-metadata';
import { container } from 'tsyringe';
import { FormSpy } from './form-spy';

class Observer {
  public formInitHandler(): void {
    return;
  }
}

describe('FormSpy', () => {
  let formSpy: FormSpy;

  beforeEach(() => {
    container.clearInstances();
    formSpy = container.createChildContainer().resolve(FormSpy);
  });

  it('Should return true for init form', () => {
    formSpy.formWasInit = true;
    expect(formSpy.formWasInit).toBeTrue();
  });

  it('Should call formWasInitHandler', () => {
    const observer = new Observer();
    const spy = spyOn(observer, 'formInitHandler');
    formSpy.listenFormInit(observer.formInitHandler);
    formSpy.formWasInit = true;
    expect(spy).toHaveBeenCalled();
  });

  it('Should not re-fire a registered callback on a subsequent formWasInit cycle', () => {
    const observer = new Observer();
    const spy = spyOn(observer, 'formInitHandler');
    formSpy.listenFormInit(observer.formInitHandler);
    formSpy.formWasInit = true;
    formSpy.formWasInit = false;
    formSpy.formWasInit = true;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Should call formInitHandler once', () => {
    const observer = new Observer();
    const spy = spyOn(observer, 'formInitHandler');
    formSpy.listenFormInit(observer.formInitHandler);
    formSpy.formWasInit = true;
    formSpy.formWasInit = false;
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
