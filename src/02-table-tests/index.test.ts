import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 8, b: 3, action: Action.Subtract, expected: 5 },
  { a: 12, b: 0, action: Action.Subtract, expected: 12 },
  { a: 8, b: -3, action: Action.Subtract, expected: 11 },
  { a: 12, b: 3, action: Action.Multiply, expected: 36 },
  { a: 0, b: Infinity, action: Action.Multiply, expected: NaN },
  { a: 3, b: -3, action: Action.Multiply, expected: -9 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 3, b: -3, action: Action.Divide, expected: -1 },
  { a: 9, b: 0, action: Action.Divide, expected: Infinity },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 0, b: 2, action: Action.Exponentiate, expected: 0 },
];

const testCasesWithIncorrectData = [
  { a: null, b: 2, action: Action.Add },
  { a: 3, b: 4, action: undefined },
  { a: '4', b: 3, action: Action.Subtract },
  { a: 12, b: 3, action: 'Subtract' },
  { a: 'b', b: 3, action: Action.Multiply },
  { a: 12, b: null, action: Action.Multiply },
  { a: 0, b: '0', action: Action.Divide },
  { a: 12, b: undefined, action: Action.Divide },
  { a: '7', b: 3, action: Action.Exponentiate },
  { a: undefined, b: 8, action: Action.Exponentiate },
  { a: 7, b: 3, action: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return correct value',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });

      expect(result).toBe(expected);
    },
  );

  test.each(testCasesWithIncorrectData)(
    'should return null for invalid action or arguments',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });

      expect(result).toBeNull();
    },
  );
});
