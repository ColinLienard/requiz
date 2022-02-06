import { FC, useContext } from 'react';
import Popup from 'react-customizable-popup';
import SocketContext from '../../../lib/contexts/SocketContext';
import useTimer from '../../../lib/hooks/useTimer';
import ShareIcon from '../../../public/icons/iconComponents/ShareIcon';
import styles from './WaitingRoom.module.scss';

const WaitingRoom: FC = () => {
  const socket = useContext(SocketContext);
  const timer = useTimer(socket, 'minutes-secondes');

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      <h3 className={styles.toptext}>Waiting room</h3>
      <p className={styles.title}>The quiz begins in</p>
      <p className={styles.bigTitle}>{timer || '00:00'}</p>
      <Popup
        toggler={(
          <button className={styles.button} type="submit">
            <ShareIcon />
            Share this quiz
          </button>
        )}
        className={styles.popup}
        backdropClassName="backdrop"
      >
        <button
          className={styles.popupButton}
          type="button"
          onClick={copyLink}
          data-close
        >
          Share by link
        </button>
      </Popup>
      <ul className={styles.reactions}>
        <li>
          <button className={styles.reaction} onClick={() => null} type="button">🔥</button>
        </li>
        <li>
          <button className={styles.reaction} onClick={() => null} type="button">✨</button>
        </li>
        <li>
          <button className={styles.reaction} onClick={() => null} type="button">😎</button>
        </li>
        <li>
          <button className={styles.reaction} onClick={() => null} type="button">😱</button>
        </li>
      </ul>
    </>
  );
};

export default WaitingRoom;
