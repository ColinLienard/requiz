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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        <input type="text" name="title" required defaultValue={defaultData?.title} onChange={handleChange} />
      </label>
      <label htmlFor="description">
        Description
        <input type="text" name="description" required defaultValue={defaultData?.description} onChange={handleChange} />
      </label>
    </section>
  );
};

SettingBar.defaultProps = {
  defaultData: {},
};

export default SettingBar;
