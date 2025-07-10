import CreateCustomer from '@/features/customer/CreateCustomer';
import Customer from '@/features/customer/Customer';
import AccountOperations from '@/features/account/AccountOperations';

import './App.css';

export default function App() {
  // Global UI State
  const fullName = '%NAME%';
  const nationalID = 12345;

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
        </>
      )}
    </div>
  );
}
