import { container } from 'tsyringe';
import { Lang } from '../../../core/i18n/lang.enum';
import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  let pipe: DatePipe;

  beforeEach(() => {
    container.clearInstances();

    pipe = container.createChildContainer().resolve(DatePipe);
  });

  it('Should return empty string for invalid date', () => {
    const value = pipe.transform('invalid-date');
    expect(value).toEqual('');
  });

  it('Should return formatted date for en language', () => {
    const value = pipe.transform('2023-10-10T10:00:00+03:00', Lang.EN);
    expect(value).toEqual('10/10/2023');
  });

  it('Should return formatted date for ru language', () => {
    const value = pipe.transform('2023-10-10T10:00:00+03:00', Lang.RU);
    expect(value).toEqual('10.10.2023');
  });
});
