import styled from "styled-components";

export const USersList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
`;

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserDot = styled.div<{ color?: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#000"};
`;

export const UserName = styled.span`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;
