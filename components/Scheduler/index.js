import { Button, Container } from "@chakra-ui/react";
import firebase from '../../config/firebase';

export default function Scheduler() {

  const logout = () => firebase.auth().signOut();
  
  return(
    <Container>

    <div>Agenda</div>

    <Button onClick={logout}>Sair</Button>

    </Container>
  )
}