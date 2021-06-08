import styled from 'styled-components';
import background from '../../img/background.png';

export const AppBackground = styled.div`
  padding: 20px;
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-color: #cccccc;
  background-size: cover;
  display: flex;
  align-items: center;
`;

export const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 40px);
  border-radius: 10px;
  box-shadow:
    0 12.1px 2.6px rgba(0, 0, 0, 0.018),
    0 24.9px 6.9px rgba(0, 0, 0, 0.026),
    0 40.2px 13.8px rgba(0, 0, 0, 0.032),
    0 61.7px 25.1px rgba(0, 0, 0, 0.039),
    0 100.2px 44.6px rgba(0, 0, 0, 0.047),
    0 249px 80px rgba(0, 0, 0, 0.06);
  background: rgba(252, 252, 252, 0.7);
  overflow: hidden;
`;

export const AppLogo = styled.div`
  padding: 12px 24px;
`;

export const AppSidebar = styled.div`
  width: 250px;
  border-right: 2px solid #edcfdf;
  background: rgba(252, 252, 252, 0.85);
`;

export const AppImage = styled.div`
  width: 100%;
  height: 100%;
`;

export const AppMain = styled.div`
  padding: 20px;
  width: calc(100% - 250px);
  overflow-y: auto;
`;

export const AppContent = styled.div`
`;
