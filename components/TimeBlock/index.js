import React from 'react';
import { Button } from '@chakra-ui/react';

export default function TimeBlock({time}) {  
  return(
    
      <Button borderRadius={10} paddingY="2em"
        background="#1DB954" color="white"
      >
        {time} 
      </Button>
   
  )
}