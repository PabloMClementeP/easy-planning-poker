import { ButtonStyled } from "./style";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}
const Button = ({ onClick, disabled = false, children }: ButtonProps) => {
  return (
    <ButtonStyled onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
