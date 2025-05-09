import styled from "styled-components";

export const HeaderSection = styled.section`
  display: flex;
  padding: 1rem;
  background-color: #d12e2e;
  color: #fff;
  justify-content: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1024px;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #ffffff2d;
  padding: 4px 8px;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
`;
