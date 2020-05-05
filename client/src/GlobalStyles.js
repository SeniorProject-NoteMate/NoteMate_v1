import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.background};
    padding-bottom: 2%;
    min-height: 800px;
  }

`;

export default GlobalStyle;