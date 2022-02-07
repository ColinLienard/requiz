import { FC, memo } from 'react';

const MenuIcon: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <circle cx="6" cy="18" r="2" />
  </svg>
);

export default memo(MenuIcon);
