import './Label.styles.css';

export type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export default function Label({
  children,
  className,
  ...restProps
}: LabelProps) {
  return (
    <label
      className={className ? `label ${className}` : 'label'}
      {...restProps}
    >
      {children}
    </label>
  );
}
