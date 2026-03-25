import { FormLoader } from './form-loader';
import { Field } from './field.interface';
import { FieldsType } from './fields-type.enum';

describe('FormLoader', () => {
  let formLoader: FormLoader;

  const mockTextField: Field = {
    name: 'email',
    type: FieldsType.text,
  } as unknown as Field;

  beforeEach(() => {
    formLoader = new FormLoader();
  });

  it('should resolve when all fields are loaded', async () => {
    const promise = formLoader.setupAndAwaitFieldsLoading([mockTextField]);
    formLoader.setFieldLoaded('email');
    await expectAsync(promise).toBeResolved();
  });

  it('should resolve immediately for empty fields', async () => {
    const promise = formLoader.setupAndAwaitFieldsLoading([]);
    await expectAsync(promise).toBeResolved();
  });

  it('should reject immediately when signal is already aborted', async () => {
    const controller = new AbortController();
    controller.abort();

    const promise = formLoader.setupAndAwaitFieldsLoading(
      [mockTextField],
      controller.signal,
    );

    await expectAsync(promise).toBeRejectedWithError(/Aborted|abort/i);
  });

  it('should reject when signal aborts after setup', async () => {
    const controller = new AbortController();

    const promise = formLoader.setupAndAwaitFieldsLoading(
      [mockTextField],
      controller.signal,
    );

    controller.abort();

    await expectAsync(promise).toBeRejectedWithError(/Aborted|abort/i);
  });

  it('should not reject after normal resolve even if signal aborts later', async () => {
    const controller = new AbortController();

    const promise = formLoader.setupAndAwaitFieldsLoading(
      [mockTextField],
      controller.signal,
    );

    formLoader.setFieldLoaded('email');
    await promise;

    controller.abort();
    // Should not throw — already resolved
  });

  it('should resolve immediately for empty fields even with signal', async () => {
    const controller = new AbortController();
    const promise = formLoader.setupAndAwaitFieldsLoading([], controller.signal);
    await expectAsync(promise).toBeResolved();
  });

});
