import { useState } from 'react';

import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';

import { useLazyConvertCurrencyQuery } from '@/services/frankfurterApi';
import type { CurrencyToConvert } from '@/services/frankfurterApi';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  moneyDeposited,
  moneyWithdrawn,
  loanRequested,
  selectLoan,
} from '../accountSlice';

import './AccountOperations.styles.css';

type Currency = 'USD' | 'EUR' | 'GBP';

function DepositForm() {
  // Local UI State
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState<Currency>('USD');

  // Global Remote State
  const [convertCurrency, conversionResult] = useLazyConvertCurrencyQuery();
  const { isFetching } = conversionResult;

  // Derived Global Remote State
  const currencyIsConverting = isFetching;

  const dispatch = useAppDispatch();

  async function convertAndDeposit(currencyToConvert: CurrencyToConvert) {
    const result = await convertCurrency(currencyToConvert, true);
    const data = result.data;

    if (!data) return;

    dispatch(moneyDeposited({ amount: data.rates.USD, currency: 'USD' }));
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!amount) return;

    if (currency === 'USD') {
      dispatch(moneyDeposited({ amount, currency }));
    } else {
      void convertAndDeposit({ amount, currency });
    }

    setAmount(0);
    setCurrency('USD');
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Label htmlFor="deposit">Deposit</Label>
      <Input
        id="deposit"
        className="account-operations__input"
        type="number"
        min={0}
        value={amount}
        onChange={(e) => {
          setAmount(+e.target.value);
        }}
        disabled={currencyIsConverting}
      />
      <Select
        id="currency"
        className="account-operations__select"
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value as Currency);
        }}
        disabled={currencyIsConverting}
      >
        <option value="USD">US Dollar</option>
        <option value="EUR">Euro</option>
        <option value="GBP">British Pound</option>
      </Select>

      <Button type="submit" disabled={currencyIsConverting}>
        {currencyIsConverting ? 'Converting...' : `Deposit ${String(amount)}`}
      </Button>
    </form>
  );
}

function WithdrawForm() {
  // Local UI State
  const [amount, setAmount] = useState(0);

  const dispatch = useAppDispatch();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!amount) return;

    dispatch(moneyWithdrawn(amount));
    setAmount(0);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Label htmlFor="withdraw">Withdraw</Label>
      <Input
        id="withdraw"
        className="account-operations__input"
        type="number"
        min={0}
        value={amount}
        onChange={(e) => {
          setAmount(+e.target.value);
        }}
      />
      <Button type="submit">Withdraw {amount}</Button>
    </form>
  );
}

function RequestLoanForm() {
  // Local UI State
  const [amount, setAmount] = useState(0);
  const [purpose, setPurpose] = useState('');

  const dispatch = useAppDispatch();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!amount || !purpose) return;

    dispatch(loanRequested({ amount, purpose }));
    setAmount(0);
    setPurpose('');
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Label htmlFor="loan-amount">Request loan</Label>
      <Input
        id="loan-amount"
        className="account-operations__input"
        type="number"
        min={0}
        value={amount}
        onChange={(e) => {
          setAmount(+e.target.value);
        }}
        placeholder="Loan amount"
      />
      <Input
        className="account-operations__input"
        value={purpose}
        onChange={(e) => {
          setPurpose(e.target.value);
        }}
        placeholder="Loan purpose"
      />
      <Button type="submit">Request loan</Button>
    </form>
  );
}

function PayLoanForm() {
  // Global UI State
  const loan = useAppSelector(selectLoan);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return;
  }

  return (
    <form className="pay-loan-form" onSubmit={handleFormSubmit}>
      <span className="pay-loan-form__text">
        Pay back ${loan.amount} ({loan.purpose})
      </span>
      <Button type="submit">Pay loan</Button>
    </form>
  );
}

export default function AccountOperations() {
  // Global UI State
  const loan = useAppSelector(selectLoan);

  return (
    <div className="account-operations">
      <h2 className="account-operations__title">Your account operations</h2>
      <div className="account-operations__inputs">
        <DepositForm />
        <WithdrawForm />
        <RequestLoanForm />
        {loan.amount > 0 && <PayLoanForm />}
      </div>
    </div>
  );
}
