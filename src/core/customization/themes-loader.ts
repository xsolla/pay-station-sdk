import 'reflect-metadata';
import { injectable } from 'tsyringe';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { default as styles } from '../../styles/themes/default/secure-styles/style.string-style.scss';
@injectable()
export class ThemesLoader {
  public getTheme(): string {
    return styles as string;
  }
}
