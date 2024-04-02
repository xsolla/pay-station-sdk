import 'reflect-metadata';
import './assets/fonts';
import './styles/style.scss';

export { headlessCheckout } from './features/headless-checkout/headless-checkout.instance';
export * from './web-components';
export { Lang } from './core/i18n/lang.enum';
export { EventName } from './core/event-name.enum';
export { NextActionType } from './core/actions/next-action-type.enum';
