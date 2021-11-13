import { FC } from 'react';

type Props = {
  name: string,
  lives: number
}

const UserItem: FC<Props> = ({ name, lives }) => {
  return (
    <p>{`${name} - ${lives}💕`}</p>
  );
};

export default UserItem;
