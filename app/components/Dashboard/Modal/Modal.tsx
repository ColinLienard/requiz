import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { QuizData } from '../../../lib/types';
import UserItem from '../../Common/UserItem/UserItem';
import QuizStatusIndicator from '../../Common/QuizStatusIndicator/QuizStatusIndicator';
import Alert, { AlertHandle } from '../../Common/Alert/Alert';
import useDate from '../../../lib/hooks/useDate';
import useQuizTheme from '../../../lib/hooks/useQuizTheme';
import CrossIcon from '../../../public/icons/iconComponents/CrossIcon';
import ShareIcon from '../../../public/icons/iconComponents/ShareIcon';
import styles from './Modal.module.scss';

type Props = {
  quiz?: QuizData,
  onClose: () => void,
};

const Modal: FC<Props> = ({ quiz, onClose }) => {
  const [visible, setVisible] = useState(false);
  const date = useDate(quiz?.startDate as string);
  const theme = useQuizTheme(quiz?.theme);
  const alert = useRef<AlertHandle>(null);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  const handleEchapKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEchapKey);

    return () => {
      window.removeEventListener('keydown', handleEchapKey);
    };
  }, []);

  useEffect(() => {
    if (quiz) {
      setVisible(true);
    } else {
      handleClose();
    }
  }, [quiz]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/quiz/${quiz?._id}`);
    alert.current?.alert(
      'The url of your quiz has been copied to your clipboard. Share it so people can play your quiz.',
      'success',
    );
  };

  return (
    <>
      <Alert ref={alert} />
      <div
        className={`${styles.backdrop} ${visible && styles.visible}`}
        onClick={handleClose}
        role="button"
        aria-hidden="true"
      />
      <aside className={`${styles.modal} ${visible && styles.visible}`}>
        <div className={`${styles.header} ${visible && styles.visible}`} style={{ backgroundColor: theme?.color }}>
          <div className={styles.noise} />
          <div className={styles.icons}>
            <button className={styles.cross} type="button" onClick={handleClose}>
              <CrossIcon />
            </button>
            {quiz?.status && (
              <button className={styles.share} type="button" onClick={copyToClipboard}>
                <ShareIcon />
              </button>
            )}
          </div>
          <span className={styles.theme}>
            <span className={styles.emoji}>{theme?.emoji}</span>
            {theme?.name}
          </span>
          <h3 className={styles.hero}>{quiz?.title}</h3>
        </div>
        <div className={styles.main}>
          <div className={styles.userContainer}>
            {quiz?.status ? (
              <QuizStatusIndicator status={quiz?.status} />
            ) : (
              <>
                <p>by</p>
                <UserItem id={quiz?.userId} small />
              </>
            )}
          </div>
          <p className={styles.description}>{quiz?.description}</p>
          <p className={styles.date}>Starts in <b>{date}</b></p>
          {quiz?.status && (
            <Link href={`/creator/${quiz?._id}`}>
              <a className={styles.button}>Edit</a>
            </Link>
          )}
          {(!quiz?.status || quiz?.status === 'waiting' || quiz?.status === 'playing') && (
            <Link href={`/quiz/${quiz?._id}`}>
              <a className={styles.button}>Join {quiz?.status && 'as the master'}</a>
            </Link>
          )}
          {quiz?.peopleIn?.length && quiz?.peopleIn?.length > 0 ? (
            <>
              <h4 className={styles.title}>
                Waiting <span className={styles.transparent}>({quiz.peopleIn.length})</span>
              </h4>
              <ul>
                {quiz?.peopleIn?.map((userId) => (
                  <li key={userId}>
                    <UserItem id={userId} />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </aside>
    </>
  );
};

Modal.defaultProps = {
  quiz: undefined,
};

export default Modal;
