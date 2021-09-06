import firebaseClient from '../config/firebase/client';
import Login from "../components/Login";
import Scheduler from "../components/Scheduler";
import { useEffect, useState } from 'react';
import { Center, Container, Heading, Spinner } from '@chakra-ui/react';

export default function Home() {
  const [userAuth, setUserAuth] = useState({
    loading: true,
    user: false
  });

    useEffect(() =>  {
      firebaseClient.auth().onAuthStateChanged(user => setUserAuth({loading: false, user}));
    }, [])

    if(userAuth.loading) {
      return(
        <Center h="100vh">
          <Container centerContent>

            <Heading variant="logo" paddingBottom={4}> planly </Heading>
            <Spinner size="xl" color="#1DB954" label="loading..." thickness="5px" />
            
         </Container>
        </Center>
      )
    }

  return (
    userAuth.user
    ? <Scheduler />
    : <Login />
  )
      
}
