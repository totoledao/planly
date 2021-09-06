import { 
  Center,
  Container,
  Button
} from "@chakra-ui/react";
import firebaseClient from '../../config/firebase/client';

export default function Scheduler() {

  const logout = () => firebaseClient.auth().signOut();

  return(
    <Center h="100vh">
      <Container>

      <div>Agenda</div>

      <Button onClick={logout}>Sair</Button>

      </Container>
    </Center>
  )
}