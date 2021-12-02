import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
} from 'react';
import { QuizData } from '../../../lib/types';

type Props = {
  setSettings: Dispatch<SetStateAction<QuizData | undefined>>,
  defaultData?: QuizData
}

const SettingBar: FC<Props> = ({ setSettings, defaultData }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings((settings) => {
      return {
        ...settings,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <section>
      <h2>Settings</h2>
      <label htmlFor="title">
        Title
        <input
          type="text"
          name="title"
          defaultValue={defaultData?.title}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          name="description"
          defaultValue={defaultData?.description}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="themes">
        Theme
        <select
          name="theme"
          defaultValue={defaultData?.theme}
          onChange={handleChange}
        >
          <option value="none">Choose a theme</option>
          <option value="videoGames">Video games</option>
          <option value="overallCulture">Overall culture</option>
        </select>
      </label>
      <label htmlFor="maxPlayers">
        Maximum number of players
        <input
          type="number"
          name="maxPlayers"
          defaultValue={defaultData?.maxPlayers}
          min={4}
          max={40}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="startDate">
        Start date
        <input
          type="datetime-local"
          name="startDate"
          defaultValue={defaultData?.startDate}
          onChange={handleChange}
        />
      </label>
    </section>
  );
};

SettingBar.defaultProps = {
  defaultData: {},
};

export default SettingBar;
