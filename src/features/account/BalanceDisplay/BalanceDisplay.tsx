import { useAppSelector } from '@/app/hooks';
import { selectBalance } from '../accountSlice';

import './BalanceDisplay.styles.css';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export interface BalanceDisplayProps {
  className?: string;
}

export default function BalanceDisplay({ className }: BalanceDisplayProps) {
  // Global UI State
  const balance = useAppSelector(selectBalance);

  return (
    <div className={className ? `balance ${className}` : 'balance'}>
      {formatCurrency(balance)}
    </div>
  );
}
