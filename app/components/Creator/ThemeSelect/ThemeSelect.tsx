import { FC } from 'react';
import Popup from 'react-customizable-popup';
import useQuizTheme from '../../../lib/hooks/useQuizTheme';
import { QuizThemes } from '../../../lib/types';
import styles from './ThemeSelect.module.scss';

type Props = {
  defaultValue?: QuizThemes,
  onChange: (value: QuizThemes) => void,
};

const ThemeSelect: FC<Props> = ({ defaultValue, onChange }) => {
  const theme = useQuizTheme(defaultValue);

  return (
    <Popup
      toggler={(
        <button className={styles.themeSelect} type="button" style={{ backgroundColor: theme?.color }}>
          {theme?.emoji} {theme?.name}
        </button>
      )}
      position={['center', 'center']}
      arrow={false}
    >
      salut
    </Popup>
  );
};

ThemeSelect.defaultProps = {
  defaultValue: undefined,
};

export default ThemeSelect;
