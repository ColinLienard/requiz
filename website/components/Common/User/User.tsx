import { FC } from 'react';

type Props = {
  name: string,
}

const User: FC<Props> = ({ name }) => {
  return (
    <p>{name}</p>
  );
};

export default User;
