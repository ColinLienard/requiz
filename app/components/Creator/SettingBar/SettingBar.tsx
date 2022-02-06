import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
} from 'react';
import Link from 'next/link';
import useMobile from '../../../lib/hooks/useMobile';
import { QuizData, QuizThemes } from '../../../lib/types';
import CrossIcon from '../../../public/icons/iconComponents/CrossIcon';
import ThemeSelect from '../ThemeSelect/ThemeSelect';
import styles from './SettingBar.module.scss';

type Props = {
  visible: boolean,
  hide: () => void,
  setSettings: Dispatch<SetStateAction<QuizData | undefined>>,
  defaultData?: QuizData,
};

const SettingBar: FC<Props> = ({
  visible,
  hide,
  setSettings,
  defaultData,
}) => {
  const isMobile = useMobile();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings((settings) => ({
      ...settings,
      [event.target.name]: event.target.value,
    }));
  };

  const handleThemeChange = (value: QuizThemes) => {
    setSettings((settings) => ({
      ...settings,
      theme: value,
    }));
  };

  return (
    <aside className={`${styles.settingBar} ${visible && styles.visible}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Settings</h2>
        <Link href="/dashboard">
          <a className={styles.link}>Back to the home page</a>
        </Link>
        {isMobile && (
          <button className={styles.cross} onClick={hide} type="button">
            <CrossIcon />
          </button>
        )}
      </div>
      <div className={styles.form}>
        <label className={styles.label} htmlFor="title">Title of your quiz</label>
        <input
          className={styles.input}
          name="title"
          id="title"
          type="text"
          defaultValue={defaultData?.title}
          onChange={handleChange}
          placeholder="Give your quiz a great name !"
        />
        <label className={styles.label} htmlFor="description">Description</label>
        <textarea
          className={styles.textarea}
          name="description"
          id="description"
          rows={4}
          defaultValue={defaultData?.description}
          onChange={handleChange}
          placeholder="Write a short description of your quiz topic."
        />
        <label className={styles.label} htmlFor="themes">Theme</label>
        <ThemeSelect
          defaultValue={defaultData?.theme}
          onChange={handleThemeChange}
        />
        <label className={styles.label} htmlFor="maxPlayers">Maximum number of players</label>
        <input
          className={styles.input}
          name="maxPlayers"
          id="maxPlayers"
          type="number"
          defaultValue={defaultData?.maxPlayers}
          min={4}
          max={40}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor="startDate">Start date</label>
        <input
          className={styles.input}
          name="startDate"
          id="startDate"
          type="datetime-local"
          defaultValue={defaultData?.startDate}
          onChange={handleChange}
        />
        {isMobile && (
          <button className={styles.button} onClick={hide} type="button">OK</button>
        )}
      </div>
    </aside>
  );
};

SettingBar.defaultProps = {
  defaultData: {},
};

export default SettingBar;
