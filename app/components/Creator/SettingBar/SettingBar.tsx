import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
} from 'react';
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
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <section className={`${styles.settingBar} ${visible && styles.visible}`}>
      <button className={styles.cross} onClick={hide} type="button">
        <CrossIcon />
      </button>
      <h2 className={styles.title}>Settings</h2>
      <div className={styles.form}>
        <label className={styles.label} htmlFor="title">Title of your quiz</label>
        <input
          className={styles.input}
          name="title"
          id="title"
          type="text"
          defaultValue={defaultData?.title}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor="description">Description</label>
        <input
          className={styles.input}
          name="description"
          id="description"
          type="text"
          defaultValue={defaultData?.description}
          onChange={handleChange}
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
        <button className={styles.button} onClick={hide} type="button">OK</button>
      </div>
    </section>
  );
};

SettingBar.defaultProps = {
  defaultData: {},
};

export default SettingBar;
