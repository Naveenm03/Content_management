// styles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.textColor};
  }

  /* Add dark mode styles for specific elements as needed */
`;

export default GlobalStyle;
