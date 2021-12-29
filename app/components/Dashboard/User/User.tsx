import { FC } from 'react';

type Props = {
  name: string,
  image?: string
}

const User: FC<Props> = ({ name, image }) => {
  return (
    <div>
      {image && (
        <img src={image} alt="" />
      )}
      <p>{name}</p>
    </div>
  );
};

User.defaultProps = {
  image: undefined,
};

export default User;
