import { 
  Center,
  Container,
  Box,
  Heading,
  Text,
  Button,
  IconButton
} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addDays, subDays } from 'date-fns';
import axios from 'axios';

import { useAuth } from '../components/Auth';
import { dateFormat, formatDate } from '../components/DateFormat';
import LoadingScreen from '../components/LoadingScreen';

const getSchedule = ( { token, when } ) => axios({
  method: 'get',
  url: '/api/schedule',
  params: {
    when    
  },
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default function Scheduler() {

  const [when, setWhen] = useState(() => new Date())

  const [auth, { logout }] = useAuth();
  const router = useRouter();

  const previousDay = () => {
    setWhen( oldValue => subDays(oldValue, 1) );
  }
  
  const nextDay = () => {
    setWhen( oldValue => addDays(oldValue, 1) );
  }

  useEffect(() => {
    !auth.user && router.push('/');
  },[auth.user])

  if(!auth.user) {
    return ( <LoadingScreen /> )
  }

  return(
    
    <Container centerContent>

      <Container display="flex" flexDir="row"
        justifyContent='space-between'
        paddingTop="1.5rem" paddingBottom="1.5rem"
      >
        <Heading variant="logo" > planly </Heading>  
        <Button onClick={logout}>Sair</Button>
      </Container>

      <Container paddingTop={4} 
        display="flex" flexDirection="row" 
        justifyContent='space-between' alignItems="center"
      >
        <IconButton aria-label="Left" icon={<ChevronLeftIcon />} bg="transparent" onClick={previousDay}/>
        <Text>{formatDate(when, 'PPPP')}</Text>
        <IconButton aria-label="Right" icon={<ChevronRightIcon />} bg="transparent"  onClick={nextDay} />
      </Container>


    </Container>
  )
}