import './Customer.styles.css';

export default function Customer() {
  const customer = '%NAME%';

  return <h2 className="customer">👋 Welcome, {customer}</h2>;
}
