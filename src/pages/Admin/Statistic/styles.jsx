import styled, { css } from 'styled-components';

export const CardContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
  background-color: white;
`;

export const StatisticFilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const RevenueContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: #6972FF;
  box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
`;

export const TopUpContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: #FF8C80;
  box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
`;

export const UserTrafficIcon  = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 4px;
  background-color: #f5f2f2;
`;

export const FacilityRevenueContainer = styled.div`
  padding: 16px;
  border-radius: 4px;

  ${(props) => props.f254nvl
    && css`
      background-image: linear-gradient(90deg, #5C2BD7,#2B70F9);
      box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
    `}

  ${(props) => props.f03qtr
    && css`
      background-image: linear-gradient(90deg, #F21C58,#FD5B1C);
      box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
    `}

  ${(props) => props.f334nvl
    && css`
      background-image: linear-gradient(90deg, #37B684,#88C648);
      box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
    `}
  
  ${(props) => props.fhk
    && css`
      background-image: linear-gradient(90deg, #FC591D,#F8B132);
      box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
    `}
`;
