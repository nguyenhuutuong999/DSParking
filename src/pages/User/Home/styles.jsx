import styled from 'styled-components';

export const CardContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
  background-color: white;
`;

export const ProfileCardContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
  border-radius: 4px;
  box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
  background-color: white;
  overflow: hidden;
`;

export const ProfileCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 32px;
`;

export const ProfileCardBackground = styled.div`
  margin-bottom: 100px;
  width: 100%;
  height: 100px;
  background-color: #c44a8a;
`;

export const ProfileAvatar = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  width: 160px;
  height: 160px;
  border-radius: 999px;
  border: 5px solid white;
  transform: translateX(-50%);
  overflow: hidden;
`;
