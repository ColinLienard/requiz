import {
  Dispatch,
  forwardRef,
  memo,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import CheckIcon from '../../../public/icons/iconComponents/CheckIcon';
import WarningIcon from '../../../public/icons/iconComponents/WarningIcon';
import styles from './Alert.module.scss';

export type AlertHandle = {
  show: () => void,
  hide: () => void,
  setContent: Dispatch<SetStateAction<string>>,
  setType: Dispatch<SetStateAction<'error' | 'success'>>,
};

const Alert = forwardRef<AlertHandle>((props, forwardedRef) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState<'error' | 'success'>('error');
  const interval = useRef<NodeJS.Timer | null>(null);

  const show = () => {
    setVisible(true);
    interval.current = setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const hide = () => {
    setVisible(false);
    if (interval.current) {
      clearTimeout(interval.current);
    }
  };

  useImperativeHandle(forwardedRef, () => ({
    show,
    hide,
    setContent,
    setType,
  }));

  useEffect(() => {
    if (content) {
      show();
    }
  }, [content]);

  return (
    <div
      className={`${styles.alert} ${visible && styles.visible} ${type === 'error' ? styles.error : styles.success}`}
      onClick={hide}
      role="button"
      aria-hidden="true"
    >
      {type === 'error' ? (
        <WarningIcon />
      ) : (
        <CheckIcon />
      )}
      <div className={styles.textContainer}>
        <p className={styles.title}>{type === 'error' ? 'Error' : 'Success'}</p>
        <p className={styles.text}>{content}</p>
      </div>
    </div>
  );
});

export default memo(Alert);
