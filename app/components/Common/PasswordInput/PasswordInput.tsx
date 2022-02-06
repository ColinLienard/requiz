import { FC, useState } from 'react';
import EyeIcon from '../../../public/icons/iconComponents/EyeIcon';
import ClosedEyeIcon from '../../../public/icons/iconComponents/ClosedEyeIcon';
import styles from './PasswordInput.module.scss';

type Props = {
  className: string,
  name: string,
  id: string,
  required: boolean,
  placeholder: string,
};

const PasswordInput: FC<Props> = ({
  className,
  name,
  id,
  required,
  placeholder,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.inputContainer}>
      <input
        className={className}
        name={name}
        id={id}
        required={required}
        placeholder={placeholder}
        type={visible ? 'text' : 'password'}
      />
      <button className={styles.toggler} type="button" onClick={() => setVisible((v) => !v)}>
        {visible ? (
          <ClosedEyeIcon />
        ) : (
          <EyeIcon />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
