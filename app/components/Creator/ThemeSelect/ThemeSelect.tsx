import { FC, useRef, useState } from 'react';
import Popup, { PopupHandle } from 'react-customizable-popup';
import useQuizTheme, { themes } from '../../../lib/hooks/useQuizTheme';
import { QuizThemes } from '../../../lib/types';
import SmallArrowIcon from '../../../public/icons/iconComponents/SmallArrowIcon';
import styles from './ThemeSelect.module.scss';

type Props = {
  defaultValue?: QuizThemes,
  onChange: (value: QuizThemes) => void,
};

const ThemeSelect: FC<Props> = ({ defaultValue, onChange }) => {
  const [currentTheme, setCurrentTheme] = useState(defaultValue);
  const quizTheme = useQuizTheme(currentTheme);
  const popupRef = useRef<PopupHandle>(null);

  const handleClick = (id: QuizThemes) => {
    onChange(id);
    setCurrentTheme(id);
    popupRef.current?.close();
  };

  return (
    <Popup
      toggler={(
        <button className={styles.themeSelect} type="button" style={{ backgroundColor: quizTheme?.color }}>
          <SmallArrowIcon />
          <span className={styles.emoji}>{quizTheme?.emoji}</span>
          {quizTheme?.name}
        </button>
      )}
      ref={popupRef}
      position={['center', 'center']}
      arrow={false}
      className={styles.popup}
      backdropClassName={styles.backdrop}
    >
      <ul className={styles.list}>
        <li key={quizTheme?.id}>
          <button
            className={styles.theme}
            type="button"
            onClick={() => handleClick(quizTheme?.id as QuizThemes)}
            style={{ backgroundColor: quizTheme?.color }}
          >
            <span className={styles.emoji}>{quizTheme?.emoji}</span>
            {quizTheme?.name}
          </button>
        </li>
        {themes.map((theme) => {
          if (theme.id === quizTheme?.id) {
            return null;
          }
          return (
            <li key={theme.id}>
              <button
                className={styles.theme}
                type="button"
                onClick={() => handleClick(theme.id)}
                style={{ backgroundColor: theme.color }}
              >
                <span className={styles.emoji}>{theme.emoji}</span>
                {theme.name}
              </button>
            </li>
          );
        })}
      </ul>
    </Popup>
  );
};

ThemeSelect.defaultProps = {
  defaultValue: undefined,
};

export default ThemeSelect;
