import styled from "styled-components";

export const Main = styled.main`
  height: 100vh;
  background-color: #f9fafb;
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
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
