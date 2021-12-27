import { FC } from 'react';
import Link from 'next/link';
import UserItem from '../../Common/UserItem/UserItem';
import useDate from '../../../lib/hooks/useDate';

type Props = {
  fromUser?: boolean,
  onClick?: () => void,
  id: string,
  title: string,
  userId?: string,
  status?: string,
  peopleIn?: number,
  startsIn: string
}

const Game: FC<Props> = ({
  fromUser,
  onClick,
  id,
  title,
  userId,
  status,
  peopleIn,
  startsIn,
}) => {
  const date = useDate(startsIn);

  if (fromUser) {
    return (
      <Link href={`/creator/${id}`}>
        <a>
          <h4>{title}</h4>
          <p>{status}</p>
          <p>
            {peopleIn}
            are waiting
          </p>
          <p>
            Starts in
            {date}
          </p>
        </a>
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick}>
      <h4>{title}</h4>
      <UserItem id={userId as string} />
      {peopleIn && (
        <p>
          {peopleIn}
          are waiting
        </p>
      )}
      <p>
        Starts in
        {date}
      </p>
    </button>
  );
};

Game.defaultProps = {
  fromUser: false,
  onClick: undefined,
  userId: '',
  status: '',
  peopleIn: undefined,
};

export default Game;
