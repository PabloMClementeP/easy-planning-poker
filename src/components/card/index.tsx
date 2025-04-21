import {
  BottomText,
  CardContainer,
  CardWrapper,
  CenterCard,
  UpperText,
} from "./style";

const Card = ({
  value,
  selected,
  onClick,
  disabled,
}: {
  value: string;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <CardWrapper onClick={!disabled ? onClick : undefined} $selected={selected}>
      <UpperText>{value}</UpperText>
      <CenterCard>
        <CardContainer>{value}</CardContainer>
      </CenterCard>
      <BottomText>{value}</BottomText>
    </CardWrapper>
  );
};

export default Card;
