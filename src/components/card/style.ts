import styled from "styled-components";

export const CardWrapper = styled.div<{
  $selected?: boolean;
}>`
  font-weight: 300;
  padding: 5px;
  width: 133px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 0 4.95px 0.4px #0101010d;
  transition: box-shadow 0.4s;

  background-color: ${({ $selected }) => ($selected ? "#3b82f6" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};

  &:hover {
    outline: 2px solid #4b9ae8;
  }
`;

export const UpperText = styled.div`
  text-align: left;
  padding-bottom: 5px;
  color: #808284;
`;

export const BottomText = styled.div`
  text-align: left;
  padding-bottom: 5px;
  color: #808284;
  transform: rotate(-180deg);
`;

export const CenterCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 46px;
  border: 1px solid #d5d9de;
  border-radius: 4px;
  margin-left: 16px;
  font-weight: 300;
  margin-right: 16px;
  height: 120px;
`;

export const CardContainer = styled.span`
  font-size: 91%;
`;
