import { FC } from 'react';
import Link from 'next/link';

type Props = {
  fromUser?: boolean,
  id: string,
  title: string,
  userId?: string,
  status?: string,
  waiting: number,
  startsIn: number
}

const Game: FC<Props> = ({
  fromUser,
  id,
  title,
  userId,
  status,
  waiting,
  startsIn,
}) => {
  return (
    <Link href={`/${fromUser ? 'creator' : 'quiz'}/${id}`}>
      <a>
        <h4>{title}</h4>
        {fromUser
          ? <p>{status}</p>
          : <p>{userId}</p>}
        <p>
          {waiting}
          are waiting
        </p>
        <p>
          Starts in
          {startsIn}
          min
        </p>
      </a>
    </Link>
  );
};

Game.defaultProps = {
  fromUser: false,
  userId: '',
  status: '',
};

export default Game;
