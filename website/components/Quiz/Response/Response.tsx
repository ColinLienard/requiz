import { FC } from 'react';

type Props = {
  text: string,
  number: number,
  selected: number,
  select: (number: number) => void,
  good?: boolean
}

const Response: FC<Props> = ({
  text,
  number,
  selected,
  select,
  good,
}) => {
  return (
    <button
      type="button"
      onClick={() => select(number)}
      style={{
        backgroundColor: selected === number ? 'royalblue' : 'transparent',
        border: good ? '3px solid green' : 'none',
      }}
    >
      <h4>{number}</h4>
      <p>{text}</p>
    </button>
  );
};

Response.defaultProps = {
  good: false,
};

export default Response;
