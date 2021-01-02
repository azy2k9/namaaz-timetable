import { CSSReset, Flex, theme } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import Home from './Home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Flex bgColor="green.900" color="white" height="100vh" flexDirection="column">
        <Home />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
