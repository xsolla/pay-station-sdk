import { container } from 'tsyringe';
import { HeadlessCheckout } from './headless-checkout';

container.register<Window>(Window, { useValue: window });
export const headlessCheckout = container.resolve(HeadlessCheckout);
