import {
  ChangeEvent,
  FC,
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
  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (value === '') {
      setHeight('auto');
    } else if (textArea.current) {
      setHeight(`${textArea.current.scrollHeight + 2}px`);
    }
  }, [value]);

  return (
    <textarea
      className={styles.textarea}
      ref={textArea}
      rows={1}
      style={{ height }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default AutoResizeInput;
