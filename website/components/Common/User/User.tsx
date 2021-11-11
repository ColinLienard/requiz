import { FC } from 'react';

type Props = {
  name: string,
  lives: number
}

const User: FC<Props> = ({ name, lives }) => {
  return (
    <p>{`${name} - ${lives}💕`}</p>
  );
};

export default User;
