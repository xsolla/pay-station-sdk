import { container } from 'tsyringe';
import { HeadlessCheckout } from './headless-checkout';
import { registerPayStationSdkVersions } from '../../core/versions/window-versions';

container.register<Window>(Window, { useValue: window });

registerPayStationSdkVersions(window);

let currentInstance: HeadlessCheckout = container.resolve(HeadlessCheckout);

export const headlessCheckout = new Proxy({} as HeadlessCheckout, {
  get: (target, prop) => {
    if (prop === 'destroy') {
      return (): void => {
        currentInstance.destroy();
        container.clearInstances();
        container.register<Window>(Window, { useValue: window });
        currentInstance = container.resolve(HeadlessCheckout);
      };
    }

    return Reflect.get(
      currentInstance,
      prop,
    ) as HeadlessCheckout[keyof HeadlessCheckout];
  },

  set: (target, prop, value) => {
    return Reflect.set(currentInstance, prop, value);
  },
});
