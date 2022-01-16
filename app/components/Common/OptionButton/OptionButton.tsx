import { FC, forwardRef } from 'react';
import styles from './OptionButton.module.scss';

type Props = {
  className: string,
  onClick?: () => void,
};

const OptionButton: FC<Props> = forwardRef<HTMLButtonElement, Props>((
  { className, onClick },
  ref,
) => (
  <button
    className={`${styles.button} ${className}`}
    onClick={onClick}
    type="button"
    ref={ref}
  >
    <svg width="4" height="12" viewBox="0 0 4 12" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 4C3.10458 4 4 3.10457 4 2C4 0.895432 3.10458 0 2 0C0.895432 0 0 0.895432 0 2C0 3.10457 0.895432 4 2 4ZM2 12C3.10458 12 4 11.1046 4 10C4 8.89543 3.10458 8 2 8C0.895432 8 0 8.89543 0 10C0 11.1046 0.895432 12 2 12Z" />
    </svg>
  </button>
));

OptionButton.defaultProps = {
  onClick: undefined,
};

OptionButton.displayName = 'OptionButton';

export default OptionButton;
