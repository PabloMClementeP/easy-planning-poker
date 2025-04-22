import styled from "styled-components";

export const USersList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 20px;
`;

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const UserName = styled.span`
  display: flex;
  font-size: 22px;
  font-weight: 500;
`;
