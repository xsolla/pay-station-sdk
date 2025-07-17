import { Dictionary } from './dictionary.interface';
import ar from '../../translations/ar.json';
import bg from '../../translations/bg.json';
import cs from '../../translations/cs.json';
import de from '../../translations/de.json';
import en from '../../translations/en.json';
import es from '../../translations/es.json';
import fr from '../../translations/fr.json';
import he from '../../translations/he.json';
import it from '../../translations/it.json';
import ja from '../../translations/ja.json';
import ko from '../../translations/ko.json';
import pl from '../../translations/pl.json';
import pt from '../../translations/pt.json';
import ro from '../../translations/ro.json';
import ru from '../../translations/ru.json';
import th from '../../translations/th.json';
import tr from '../../translations/tr.json';
import vi from '../../translations/vi.json';
import id from '../../translations/id.json';
import km from '../../translations/km.json';
import lo from '../../translations/lo.json';
import ms from '../../translations/ms.json';
import my from '../../translations/my.json';
import ne from '../../translations/ne.json';
import nl from '../../translations/nl.json';
import fil from '../../translations/fil.json';
import zhHans from '../../translations/zh_HANS.json';
import zhHant from '../../translations/zh_HANT.json';

export const loadDictionaries = (): Dictionary => {
  return {
    ...ar,
    ...bg,
    ...cs,
    ...de,
    ...en,
    ...es,
    ...fr,
    ...he,
    ...it,
    ...ja,
    ...ko,
    ...pl,
    ...pt,
    ...ro,
    ...ru,
    ...th,
    ...tr,
    ...vi,
    ...id,
    ...km,
    ...lo,
    ...ms,
    ...my,
    ...ne,
    ...nl,
    ...fil,
    ...zhHans,
    ...zhHant,
  };
};
