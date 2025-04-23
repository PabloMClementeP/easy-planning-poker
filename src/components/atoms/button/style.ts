import styled from "styled-components";

export const ButtonStyled = styled.button`
  background-color: #3b82f6;
  color: #fff;
  border: 2px solid #3b82f6;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #418cd6;
  }

  &:disabled {
    color: #94a3b8;
    cursor: not-allowed;
  }
`;
