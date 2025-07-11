import './Button.styles.css';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  children,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={className ? `button ${className}` : 'button'}
      {...restProps}
    >
      {children}
    </button>
  );
}
