import { forwardRef, useState } from 'react';

type Props = {
  label: string,
  name: string
}

const PasswordInput = forwardRef<HTMLInputElement, Props>(({ label, name }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <label htmlFor={name}>
      {label}
      <input
        type={visible ? 'text' : 'password'}
        name={name}
        ref={ref}
        required
      />
      <button type="button" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Hide password' : 'Show password'}
      </button>
    </label>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
