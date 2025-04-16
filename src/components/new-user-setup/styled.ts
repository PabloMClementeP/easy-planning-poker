import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-weight: bold;
  text-align: left;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
`;

export const ColorPicker = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const ColorCircle = styled.div<{ color: string; selected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: ${({ selected }) => (selected ? "3px solid #000" : "2px solid #fff")};
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;
