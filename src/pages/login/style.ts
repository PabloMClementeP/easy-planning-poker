import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

export const Label = styled.label`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  text-align: center;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const Button = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: ${(props) => (props.disabled ? "#93c5fd" : "#3b82f6")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#93c5fd" : "#2563eb")};
  }
`;
