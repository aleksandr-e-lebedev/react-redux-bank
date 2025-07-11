import CreateCustomer from '@/features/customer/CreateCustomer';
import Customer from '@/features/customer/Customer';
import AccountOperations from '@/features/account/AccountOperations';
import BalanceDisplay from '@/features/account/BalanceDisplay';

import { useAppSelector } from './app/hooks';

import './App.css';

export default function App() {
  // Global UI State
  const { fullName, nationalID } = useAppSelector((state) => state.customer);

  // Derived Global UI State
  const customerExists = fullName && nationalID ? true : false;

  return (
    <div className="app">
      <h1 className="app__title">The React-Redux Bank</h1>

      {!customerExists ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay className="app__balance" />
        </>
      )}
    </div>
  );
}
