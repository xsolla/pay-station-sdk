import { drawIf } from './draw-if.helper';

describe('Helper drawIf', () => {
  it('Should draw template if condition is truthy', () => {
    const output = drawIf(true, 'template');
    expect(output).toEqual('template');
  });

  it('Should draw else template if condition is falsy', () => {
    const output = drawIf(false, 'template', 'elseTemplate');
    expect(output).toEqual('elseTemplate');
  });
});
