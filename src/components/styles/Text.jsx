import styled, { css } from 'styled-components';

export const Text = styled.p`
  margin: ${(props) => props.margin || 0};
  padding: ${(props) => props.padding || 0};
  max-width: ${(props) => props.width || 'auto'};
  color: ${(props) => props.color || props.theme.colors.primaryText};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.md};
  line-height: ${(props) => props.lineHeight || props.theme.lineHeight.md};
  white-space: pre-line;
  word-break: break-word;

  & > strong {
    font-weight: ${(props) => props.theme.fontWeight.w6};
    color: ${(props) => props.theme.colors.primaryHeaderText};
  }

  /*truncate*/
  ${(props) => props.truncate
    && css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
  ${(props) => props.truncateMultiLine
    && css`
      display: block;
      display: -webkit-box;
      -webkit-line-clamp: ${props.truncateMultiLine};
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}

  /*font-weight*/
  ${(props) => props.w3
    && css`
      font-weight: ${props.theme.fontWeight.w3};
    `}
  ${(props) => props.w6
    && css`
      font-weight: ${props.theme.fontWeight.w6};
    `}

  /*font-size*/
  ${(props) => props.xxxs
    && css`
      font-size: ${props.theme.fontSize.xxxs};
      line-height: ${props.theme.lineHeight.xxxs};
    `}
  ${(props) => props.xxs
    && css`
      font-size: ${props.theme.fontSize.xxs};
      line-height: ${props.theme.lineHeight.xxs};
    `}
  ${(props) => props.xs
    && css`
      font-size: ${props.theme.fontSize.xs};
      line-height: ${props.theme.lineHeight.xs};
    `}
  ${(props) => props.sm
    && css`
      font-size: ${props.theme.fontSize.sm};
      line-height: ${props.theme.lineHeight.sm};
    `}
  ${(props) => props.md
    && css`
      font-size: ${props.theme.fontSize.md};
      line-height: ${props.theme.lineHeight.md};
    `}
  ${(props) => props.lg
    && css`
      font-size: ${props.theme.fontSize.lg};
      line-height: ${props.theme.lineHeight.lg};
    `}
  ${(props) => props.xl
    && css`
      font-size: ${props.theme.fontSize.xl};
      line-height: ${props.theme.lineHeight.xl};
    `}
  ${(props) => props.xxl
    && css`
      font-size: ${props.theme.fontSize.xxl};
      line-height: ${props.theme.lineHeight.xxl};
    `}
  ${(props) => props.xxxl
    && css`
      font-size: ${props.theme.fontSize.xxxl};
      line-height: ${props.theme.lineHeight.xxxl};
    `}
  ${(props) => props.h3
    && css`
      font-size: ${props.theme.fontSize.h3};
      line-height: ${props.theme.lineHeight.h3};
    `}
  ${(props) => props.h2
    && css`
      font-size: ${props.theme.fontSize.h2};
      line-height: ${props.theme.lineHeight.h2};
    `}
  ${(props) => props.h1
    && css`
      font-size: ${props.theme.fontSize.h1};
      line-height: ${props.theme.lineHeight.h1};
    `}

  /*color*/
  ${(props) => props.primaryColor
    && css`
      color: ${props.theme.colors.primary};
    `}
  ${(props) => props.secondaryText
    && css`
      color: ${props.theme.colors.secondaryText};
    `}
  ${(props) => props.headerText
    && css`
      color: ${props.theme.colors.headerText};
    `}
  ${(props) => props.subText
    && css`
      color: ${props.theme.colors.subText};
    `}

  ${(props) => props.white
    && css`
      color: white;
    `}
  ${(props) => props.error
    && css`
      color: ${props.theme.colors.error};
    `}

  /* position text */
  ${(props) => props.center
    && css`
      text-align: center;
    `}
  ${(props) => props.right
    && css`
      text-align: right;
    `}
  ${(props) => props.left
    && css`
      text-align: left;
    `}

  /* text style */
  ${(props) => props.underline
    && css`
      text-decoration: underline;
    `}
  ${(props) => props.uppercase
    && css`
      text-transform: uppercase;
    `}

  /*pointer*/
  ${(props) => props.pointer
    && css`
      cursor: pointer;
    `}

   /* width 100% */
  ${(props) => props.widthMax
    && css`
      width: 100%;
    `}
`;
