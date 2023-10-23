import i18next from 'i18next';
import { singleton } from 'tsyringe';
import { Lang } from '../../../core/i18n/lang.enum';
import { PipeTransform } from '../pipe-transform.interface';
import { localeValidator } from '../../../core/validators/locale/locale.validator';

@singleton()
export class DecimalPipe implements PipeTransform {
  public transform(
    value: number | string,
    minIntegerDigits = 1,
    minFracDigits = 2,
    maxFracDigits = 2,
    locale: Lang | null = null,
  ): string {
    value = Number(value);

    if (isNaN(value)) {
      return '';
    }

    const formatLocale = localeValidator(locale ?? (i18next.language as Lang));
    return new Intl.NumberFormat(formatLocale, {
      minimumIntegerDigits: minIntegerDigits,
      minimumFractionDigits: minFracDigits,
      maximumFractionDigits: maxFracDigits,
    }).format(value);
  }
}
