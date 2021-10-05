import { 
  Center,
  Container,
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  SimpleGrid
} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addDays, subDays } from 'date-fns';
import axios from 'axios';

import { getToken } from '../config/firebase/client'
import { useAuth } from '../components/Auth';
import { dateFormat, formatDate } from '../components/DateFormat';
import LoadingScreen from '../components/LoadingScreen';
import TimeBlock from "../components/TimeBlock";

const getSchedule = async ( when, callback ) => {  
  const res = await axios({
    method: 'get',
    url: '/api/schedule',
    params: {
      when,
      username: window.location.pathname,    
    },    
  })
  callback(res.data);  
}

export default function Schedule() {

  const [when, setWhen] = useState(() => new Date())
  const [data, setData] = useState([]);

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
  
  useEffect(() => {    
    getSchedule( when, arg => setData(arg) );    
  },[when])

  if(!auth.user) {    
    return ( <LoadingScreen /> )
  }

  return(
    
    <Container centerContent h="100vh" >

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
      
      <Container paddingTop={"5vh"}>

        { data.length === 0
          ?
          <LoadingScreen verticalAlign="50vh" />
          :
          <SimpleGrid columns={2} spacing={10}>
            {data?.map((time, index) =>
              <TimeBlock key={index} time={time} />
              )}
          </SimpleGrid>
        }

      </Container>

    </Container>
  )
}