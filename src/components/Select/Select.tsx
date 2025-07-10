import './Select.styles.css';

export type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export default function Select({
  children,
  className,
  ...restProps
}: SelectProps) {
  return (
    <select
      className={className ? `select ${className}` : 'select'}
      {...restProps}
    >
      {children}
    </select>
  );
}
