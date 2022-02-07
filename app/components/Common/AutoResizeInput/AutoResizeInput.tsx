import {
  ChangeEvent,
  FC,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './AutoResizeInput.module.scss';

type Props = {
  value: string,
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
  placeholder: string,
};

const AutoResizeInput: FC<Props> = ({ value, onChange, placeholder }) => {
  const [height, setHeight] = useState('auto');
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (value === '') {
      setHeight('auto');
    } else if (ref.current) {
      setHeight(`${ref.current.scrollHeight + 2}px`);
    }
  }, [value]);

  return (
    <textarea
      className={styles.textarea}
      ref={ref}
      rows={1}
      style={{ height }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default memo(AutoResizeInput);
