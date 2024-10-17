import axios from 'axios';
import { throttledGetDataFromApi } from '.';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: null }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockedAxiosInstance);

    await throttledGetDataFromApi('/some-path');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  }, 30000);

  test('should perform request to correct provided url', async () => {
    const mockedPath = '/some-path';
    const mockedAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: null }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockedAxiosInstance);

    await throttledGetDataFromApi(mockedPath);

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith(mockedPath);
  }, 30000);

  test('should return response data', async () => {
    const mockedPath = '/some-path';
    const mockedData = { chupapi: 'munyanio' };
    const mockedAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockedData }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockedAxiosInstance);

    const data = await throttledGetDataFromApi(mockedPath);

    expect(data).toEqual(mockedData);
  }, 30000);
});
