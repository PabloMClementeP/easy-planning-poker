import styled, { css } from "styled-components";

// Estilos compartidos para textos que cambian con $selected
const sharedTextStyles = css<{ $selected?: boolean }>`
  text-align: left;
  padding-bottom: 5px;
  user-select: none;
  color: ${({ $selected }) => ($selected ? "#fff" : "#808284")};
`;

export const CardWrapper = styled.div<{
  $selected?: boolean;
  disabled?: boolean;
}>`
  font-weight: 300;
  padding: 5px;
  width: 133px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 0 4.95px 0.4px #0101010d;
  transition: box-shadow 0.4s;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  background-color: ${({ $selected }) => ($selected ? "#3b82f6" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};

  ${({ disabled }) =>
    !disabled &&
    `
      &:hover {
        outline: 2px solid #4b9ae8;
      }
    `}
`;

export const UpperText = styled.div<{ $selected?: boolean }>`
  ${sharedTextStyles}
`;

export const BottomText = styled.div<{ $selected?: boolean }>`
  ${sharedTextStyles}
  transform: rotate(-180deg);
`;

export const CenterCard = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 46px;
  border: 1px solid #d5d9de;
  border-radius: 4px;
  margin: 0 16px;
  font-weight: 300;
  height: 120px;
  user-select: none;
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};
`;

export const CardContainer = styled.span`
  font-size: 91%;
`;
