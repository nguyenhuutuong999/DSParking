import styled from 'styled-components';
import { Button } from 'antd';

export const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
`;

export const MoneyButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  height: 36px;
  font-size: 16px;

  & > span {
    display: flex;
    align-items: center;
  }
`;

export const HeaderButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background-color: rgba(196, 74, 138, 0.25);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    opacity: 0.75;
  }
`;
