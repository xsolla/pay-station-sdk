import { container } from 'tsyringe';
import { DecimalPipe } from '../decimal/decimal.pipe';
import { CurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  let pipe: CurrencyPipe;
  let decimalPipe: DecimalPipe;

  beforeEach(() => {
    container.clearInstances();
    decimalPipe = {
      transform: (value) => value.toString(),
    };
    pipe = container
      .createChildContainer()
      .register<DecimalPipe>(DecimalPipe, {
        useValue: decimalPipe,
      })
      .resolve(CurrencyPipe);
  });

  it('Should return null for no value', () => {
    const currency = pipe.transform(null, 'USD');
    expect(currency).toBeNull();
  });

  it('Should return null for no currency', () => {
    const currency = pipe.transform(1, '');
    expect(currency).toBeNull();
  });

  it('Should format known currency with configuration', () => {
    const amount = 1234567890;
    const currency = pipe.transform(amount, 'USD');
    expect(currency).toEqual('US$1234567890');
  });

  it('Should return null for known currency and invalid amount', () => {
    spyOn(decimalPipe, 'transform').and.returnValue('');
    const currency = pipe.transform(1, 'USD');
    expect(currency).toBeNull();
  });

  it('Should format unknown currency with default template', () => {
    const amount = 1234567890;
    const currency = pipe.transform(amount, 'AAA');
    expect(currency).toEqual('1234567890 AAA');
  });

  it('Should return null for unknown currency and invalid amount', () => {
    spyOn(decimalPipe, 'transform').and.returnValue('');
    const currency = pipe.transform(1, 'AAA');
    expect(currency).toBeNull();
  });
});
