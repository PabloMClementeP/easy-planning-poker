import styled from "styled-components";

export const CardLink = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1024px;
  width: 500px;
  text-decoration: none;
  color: #333;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 1024px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const CardSpan = styled.span<{
  color?: string;
}>`
  align-self: flex-end;
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: 8px;
  padding: 4px;
`;
