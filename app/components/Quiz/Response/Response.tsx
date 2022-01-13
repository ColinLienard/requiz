import { FC } from 'react';

type Props = {
  text: string,
  index: number,
  selected: number,
  select: (number: number) => void,
  good?: boolean
}

const Response: FC<Props> = ({
  text,
  index,
  selected,
  select,
  good,
}) => (
  <button
    type="button"
    onClick={() => select(index)}
    style={{
      backgroundColor: selected === index ? 'royalblue' : 'transparent',
      border: good ? '3px solid green' : 'none',
    }}
  >
    <h4>{index + 1}</h4>
    <p>{text}</p>
  </button>
);

Response.defaultProps = {
  good: false,
};

export default Response;
