import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../components/Auth';
import { ptBR } from 'date-fns/locale';

import '../styles/globals.css';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  
  )
}

export default MyApp
