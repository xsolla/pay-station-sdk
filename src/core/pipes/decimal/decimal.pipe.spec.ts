import { Lang } from '../../../core/i18n/lang.enum';
import { container } from 'tsyringe';
import { DecimalPipe } from './decimal.pipe';

describe('DecimalPipe', () => {
  let pipe: DecimalPipe;

  beforeEach(() => {
    container.clearInstances();

    pipe = container.createChildContainer().resolve(DecimalPipe);
  });

  it('Should return empty string for invalid number', () => {
    const value = pipe.transform('no-number');
    expect(value).toEqual('');
  });

  it('Should format string number with default settings', () => {
    const value = pipe.transform('1234567890.123');
    expect(value).toEqual('1,234,567,890.12');
  });

  it('Should format string number with custom settings', () => {
    const minIntDigits = 2;
    const minFracDigits = 1;
    const maxFracDigits = 3;
    const value = pipe.transform(
      '1.234',
      minIntDigits,
      minFracDigits,
      maxFracDigits,
      Lang.RU,
    );
    expect(value).toEqual('01,234');
  });
});
