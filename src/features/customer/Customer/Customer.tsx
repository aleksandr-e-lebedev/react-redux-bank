import { useAppSelector } from '@/app/hooks';
import { selectCustomerFullName } from '../customerSlice';

import './Customer.styles.css';

export default function Customer() {
  const customer = useAppSelector(selectCustomerFullName);

  return <h2 className="customer">👋 Welcome, {customer}</h2>;
}
