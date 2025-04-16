import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 10px;
  min-width: 300px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }
`;
