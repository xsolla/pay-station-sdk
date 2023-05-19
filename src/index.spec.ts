import { fooSum } from './';

test('basic', () => {
  expect(fooSum()).toBe(0);
});

test('basic again', () => {
  const expected = 3;
  expect(fooSum(1, 2)).toBe(expected);
});
