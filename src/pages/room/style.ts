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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

export const TicketDraft = styled.h3`
  width: 80%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid #ccc;
`;
