import React from 'react';
import { Center, Container, Heading, Spinner } from '@chakra-ui/react';

export default function LoadingScreen() {  
  return(
    <Center h="100vh">
      <Container centerContent>

        <Heading variant="logo" paddingBottom={4}> planly </Heading>
        <Spinner size="xl" color="#1DB954" label="loading..." thickness="5px" />
              
      </Container>
    </Center>
  )
}