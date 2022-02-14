import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import WarningIcon from '../../../public/icons/iconComponents/WarningIcon';
import styles from './Alert.module.scss';

type Props = {
  type: 'error' | 'success',
  text: string,
};

export type AlertHandle = {
  show: () => void,
  hide: () => void,
};

const Alert = forwardRef<AlertHandle, Props>(({ type, text }: Props, forwardedRef) => {
  const [visible, setVisible] = useState(false);
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
  }));

  return (
    <div
      className={`${styles.alert} ${visible && styles.visible} ${type === 'error' ? styles.error : styles.success}`}
      onClick={hide}
      role="button"
      aria-hidden="true"
    >
      <WarningIcon />
      <div className={styles.textContainer}>
        <p className={styles.title}>{type === 'error' ? 'Error' : 'Success'}</p>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
});

export default Alert;
