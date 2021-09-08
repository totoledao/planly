import { 
  Center,
  Container,
  Button
} from "@chakra-ui/react";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from "../components/Auth";

export default function Scheduler() {

  const [auth, { logout }] = useAuth();
  const router = useRouter();

  useEffect(() => {
    !auth.user && router.push('/');
  },[auth.user])

  return(
    <Center h="100vh">
      <Container>

      <div>Agenda</div>

      <Button onClick={logout}>Sair</Button>

      </Container>
    </Center>
  )
}