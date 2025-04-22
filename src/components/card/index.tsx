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
    <CardWrapper
      onClick={!disabled ? onClick : undefined}
      $selected={selected}
      disabled={disabled}
    >
      <UpperText $selected={selected}>{value}</UpperText>
      <CenterCard $selected={selected}>
        <CardContainer>{value}</CardContainer>
      </CenterCard>
      <BottomText $selected={selected}>{value}</BottomText>
    </CardWrapper>
  );
};

export default Card;
