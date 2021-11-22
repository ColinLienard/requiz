import { FC, useState } from 'react';

type Props = {
  label: string,
  name: string
}

const PasswordInput: FC<Props> = ({ label, name }) => {
  const [visible, setVisible] = useState(false);

  return (
    <label htmlFor={name}>
      {label}
      <input
        type={visible ? 'text' : 'password'}
        name={name}
        required
      />
      <button type="button" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Hide password' : 'Show password'}
      </button>
    </label>
  );
};

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
