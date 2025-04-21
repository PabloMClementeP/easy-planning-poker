import styled from "styled-components";

export const SidebarWrapper = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  min-width: 280px;
  height: fit-content;
  min-height: 100%;
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
