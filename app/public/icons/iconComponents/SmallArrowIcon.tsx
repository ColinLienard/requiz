import { FC, memo } from 'react';

const SmallArrowIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.34326" y="6.12131" width="3" height="8" transform="rotate(-45 2.34326 6.12131)" />
    <rect x="11.5356" y="4" width="3" height="8" transform="rotate(45 11.5356 4)" />
  </svg>
);

export default memo(SmallArrowIcon);
