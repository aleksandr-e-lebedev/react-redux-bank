import './Input.styles.css';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input({ className, ...restProps }: InputProps) {
  return (
    <input
      className={className ? `input ${className}` : 'input'}
      {...restProps}
    />
  );
}
