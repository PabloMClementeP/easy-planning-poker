import styled from "styled-components";

export const Main = styled.main`
  height: 100vh;
  background-color: #f9fafb;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 80px;
  background-color: #f5f5f5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  min-height: 500px;
  height: 600px;
  width: 100%;
`;

export const CardsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding-bottom: 100px;
`;

export const StoryInput = styled.textarea`
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 520px;
  outline: none;
  resize: none;
  height: 100px;
  transition: border-color 0.2s ease;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

export const Card = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardValue = styled.div<{ $selected?: boolean }>`
  width: 100px;
  height: 160px;
  background-color: ${({ $selected }) => ($selected ? "#3b82f6" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};
  font-size: 32px;
  border-radius: 8px;
  border: 2px solid #3b82f6;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all;

  @media (max-width: 768px) {
    width: 60px;
    height: 100px;
  }
`;

export const SideBar = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  min-width: 280px;
  height: 100%;
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const USersList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserDot = styled.div<{ color: string }>`
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

export const RevealButton = styled.button`
  background-color: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;

  &:hover {
    background-color: #e0e7ff;
  }

  &:disabled {
    color: #94a3b8;
    cursor: not-allowed;
  }
`;
