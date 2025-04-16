import styled from "styled-components";

export const Main = styled.main``;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  min-height: 500px;
  height: 600px;
`;

export const CardsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding-bottom: 100px;
`;

export const CardsList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 40px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Card = styled.li`
  cursor: pointer;
`;

export const CardValue = styled.div`
  width: 50px;
  height: 100px;
  border-radius: 10px;
  background-color: #3b82f6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
`;

export const UsersSection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  border-left: 1px solid #ccc;
`;

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#000"};
`;

export const RevealButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  margin: 12px 0;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;
