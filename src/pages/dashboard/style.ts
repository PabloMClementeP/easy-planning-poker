import styled from "styled-components";

export const DashboardSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
`;

export const JoinRoomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  gap: 10px;
`;

export const JoinRoomInput = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 280px;
  outline: none;
`;

export const JoinRoomButton = styled.button`
  padding: 10px 20px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3b82f6;
  }
`;
