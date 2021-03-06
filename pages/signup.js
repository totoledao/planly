import { 
  Container,
  Center,
  Box,
  Text,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';

import { useAuth } from '../components/Auth';

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Please fill out the email field"),
  password: yup.string().required("Please fill out the password field"),
  username: yup.string().required("Please fill out the username field"),
});

export default function Signup() {
  const [auth, { signup }] = useAuth();
  const router = useRouter();
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: signup,
    validationSchema,
    initialValues: {
      email: "",
      username: "",
      password: ""
    }
  })

  useEffect(() => {
    auth.user && router.push('/scheduler');
  },[auth.user])

  return (
    <Center h="100vh">
      <Container>
    
        <Box>
          <Heading variant="logo" paddingBottom={4}> planly </Heading>
          <Text paddingBottom={4}>Crie sua agenda compartilhada</Text>
        </Box>

        <Box paddingTop={4}>

        <FormControl isRequired id="email" paddingBottom={2}>
          <FormLabel>Email</FormLabel>
            <Input type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />        
            {touched.email && <FormHelperText textColor="red"> {errors.email} </FormHelperText>}
        </FormControl>

        <FormControl isRequired id="password" paddingBottom={10}>
          <FormLabel>Senha</FormLabel>
            <Input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />        
            {touched.password && <FormHelperText textColor="red"> {errors.password} </FormHelperText>}
        </FormControl>
        
        <FormControl isRequired id="username" >
          <InputGroup size="lg" width="100%" paddingBottom={10}>
            <InputLeftAddon>planly/</InputLeftAddon>          
              <Input type="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>          
            {touched.username && <FormHelperText textColor="red"> {errors.username} </FormHelperText>}
          </InputGroup>
        </FormControl>

        </Box>

        <Button width="100%" onClick={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>Cadastrar</Button>
        
        <Link href="/">J?? tem tem uma conta? Clique aqui!</Link>
      
      </Container>
    </Center>
    
  )
}
