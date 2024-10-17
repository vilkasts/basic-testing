import { generateLinkedList } from './index';

const mockedData = [{ a: 'b' }, 999, 'chupapi_munyanio'];
const mockedResult = {
  next: {
    next: {
      next: {
        next: null,
        value: null,
      },
      value: 'chupapi_munyanio',
    },
    value: 999,
  },
  value: { a: 'b' },
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(mockedData);

    expect(result).toStrictEqual(mockedResult);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(mockedData);

    expect(result).toMatchSnapshot();
  });
});
