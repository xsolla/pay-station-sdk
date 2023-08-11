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

  it('Should call formWasInitHandler twice', () => {
    const observer = new Observer();
    const spy = spyOn(observer, 'formInitHandler');
    formSpy.listenFormInit(observer.formInitHandler);
    formSpy.formWasInit = true;
    formSpy.formWasInit = true;
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('Should call appWasInitHandler once', () => {
    const observer = new Observer();
    const spy = spyOn(observer, 'formInitHandler');
    formSpy.listenFormInit(observer.formInitHandler);
    formSpy.formWasInit = true;
    formSpy.formWasInit = false;
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
