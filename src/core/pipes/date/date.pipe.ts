import i18next from 'i18next';
import { singleton } from 'tsyringe';
import { Lang } from '../../../core/i18n/lang.enum';
import { PipeTransform } from '../pipe-transform.interface';
import { localeValidator } from '../../../core/validators/locale/locale.validator';

@singleton()
export class DatePipe implements PipeTransform {
  public transform(value: string, locale: Lang | null = null): string {
    const date = new Date(value);

    if (!date || date.toString() === 'Invalid Date') {
      return '';
    }

    const formatLocale = localeValidator(locale ?? (i18next.language as Lang));
    return date.toLocaleDateString(formatLocale);
  }
}
