import { Card, CardValue } from "../style";

const VoteCard = ({
  value,
  selected,
  onClick,
  disabled,
}: {
  value: number;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
}) => (
  <Card
    onClick={!disabled ? onClick : undefined}
    style={{
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    }}
  >
    <CardValue $selected={selected}>{value}</CardValue>
  </Card>
);

export default VoteCard;
