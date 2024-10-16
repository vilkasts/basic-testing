import { getBankAccount } from '.';
import clearAllMocks = jest.clearAllMocks;

describe('BankAccount', () => {
  afterEach(() => {
    clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(10000);

    expect(bankAccount.getBalance()).toBe(10000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(500);

    expect(() => bankAccount.withdraw(1000)).toThrow(
      'Insufficient funds: cannot withdraw more than 500',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const currentBankAccount = getBankAccount(500);
    const targetBankAccount = getBankAccount(1000);

    expect(() => currentBankAccount.transfer(750, targetBankAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 500',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const currentBankAccount = getBankAccount(1000);

    expect(() => currentBankAccount.transfer(500, currentBankAccount)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(500);

    bankAccount.deposit(350);
    expect(bankAccount.getBalance()).toBe(850);

    bankAccount.deposit(350);
    expect(bankAccount.getBalance()).toBe(1200);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(850);

    bankAccount.withdraw(300);
    expect(bankAccount.getBalance()).toBe(550);

    bankAccount.withdraw(300);
    expect(bankAccount.getBalance()).toBe(250);
  });

  test('should transfer money', () => {
    const bankAccount1 = getBankAccount(500);
    const bankAccount2 = getBankAccount(1000);

    bankAccount1.transfer(200, bankAccount2);

    expect(bankAccount1.getBalance()).toBe(300);
    expect(bankAccount2.getBalance()).toBe(1200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(500);
    const mockedFetchBalance = jest.spyOn(bankAccount, 'fetchBalance');

    mockedFetchBalance.mockResolvedValue(1000);

    const balance = await bankAccount.fetchBalance();

    expect(typeof balance).toBe('number');
    expect(balance).toBe(1000);
  }, 30000);

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(500);
    const mockedFetchBalance = jest.spyOn(bankAccount, 'fetchBalance');

    mockedFetchBalance.mockResolvedValue(1000);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(1000);
  }, 30000);

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(500);
    const mockedFetchBalance = jest.spyOn(bankAccount, 'fetchBalance');

    mockedFetchBalance.mockResolvedValue(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  }, 30000);
});
