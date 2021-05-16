import styled, { css } from 'styled-components';

export const SidebarItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f3f3f3;
    color: #c44a8a;

    & p {
      color: #c44a8a;
    }
  }

  ${(props) => props.active
    && css`
      margin-right: -1px;
      border-right: 5px solid #c44a8a;
      background-color: rgba(196, 74, 138, 0.25);
      color: #c44a8a;

      & p {
        color: #c44a8a;
      }

      &:hover {
        background-color: rgba(196, 74, 138, 0.25);
      }
    `}
`;
