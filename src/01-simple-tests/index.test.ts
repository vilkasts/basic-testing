import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 7, b: 3, action: Action.Add })).toBe(10);
    expect(simpleCalculator({ a: 8, b: -1, action: Action.Add })).toBe(7);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Subtract })).toBe(3);
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Subtract })).toBe(-3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Multiply })).toBe(15);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 4, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: 10, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Exponentiate,
      }),
    ).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: '%' })).toBeNull();
    expect(simpleCalculator({ a: 2, b: 3, action: undefined })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: 3, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: undefined, b: 3, action: Action.Add }),
    ).toBeNull();
  });
});
