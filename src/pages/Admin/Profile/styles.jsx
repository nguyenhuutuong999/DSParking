import styled from 'styled-components';

export const ProfileCardContainer = styled.div`
  position: relative;
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

export const ChangeAvatarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.5s;
  cursor: pointer;

  & > span {
    display: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);

    & > span {
      display: block;
    }
  }
`;

export const ProfileDetailContainer = styled.div`
  border-radius: 4px;
  box-shadow: 10px 10px 14px 0 rgba(158, 157, 157, 0.25), -8px -0px 10px 0 rgba(255, 255, 255, 0.3);
  background-color: white;
  overflow: hidden;

  & .ant-tabs-nav-list {
    margin: 0 16px;
  }
`;

export const ProfileDetailContent = styled.div`
  padding: 0 16px 16px;
`;
