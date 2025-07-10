import { useState } from 'react';

import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';

import './CreateCustomer.styles.css';

export default function CreateCustomer() {
  // Local UI State
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return;
  }

  return (
    <form className="new-customer" onSubmit={handleFormSubmit}>
      <h2 className="new-customer__title">Create new customer</h2>

      <div className="new-customer__inputs">
        <div>
          <Label htmlFor="full-name">Customer full name</Label>
          <Input
            id="full-name"
            className="new-customer__input"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>

        <div>
          <Label htmlFor="national-id">National ID</Label>
          <Input
            id="national-id"
            className="new-customer__input"
            type="text"
            value={nationalId}
            onChange={(e) => {
              setNationalId(e.target.value);
            }}
          />
        </div>

        <Button className="new-customer__button" type="submit">
          Create new customer
        </Button>
      </div>
    </form>
  );
}
