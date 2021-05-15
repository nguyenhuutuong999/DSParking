import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
  }

  body {
    line-height: 1;
    font-family:'Noto Sans', 'Arial', 'Tahoma';
  }

  ol,
  ul {
    list-style: none;
  }

  a {
    &,
    &:focus,
    &:hover {
      outline: none;
      text-decoration: none !important;
    }
  }

  button {
    &,
    &.button {
      &:focus {
        outline: 0 none;
      }
    }
  }

  button::-moz-focus-inner {
    border: 0;
  }

  input[type="checkbox"]:focus {
    outline: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  label,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    font-weight: 400;
  }

  :focus {
    outline: none;
  }

  * {
    margin: 0;
    padding: 0;

    &,
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }

  body {
    background-color: #fff;
    color: #000;
  }

  input {
    &:focus {
      outline: none;
    }

    &[type=number] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
    }
  }

  table {
    width: 100%;
  }
`;

export default GlobalStyle;
