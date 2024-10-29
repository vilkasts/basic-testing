import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  const mockedMockOne = jest.fn(mockOne);
  const mockedMockTwo = jest.fn(mockTwo);
  const mockedMockThree = jest.fn(mockThree);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockedMockOne();
    mockedMockTwo();
    mockedMockThree();

    expect(mockedMockOne).toHaveBeenCalledTimes(1);
    expect(mockedMockTwo).toHaveBeenCalledTimes(1);
    expect(mockedMockThree).toHaveBeenCalledTimes(1);
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');

    consoleSpy.mockRestore();
  });
});
