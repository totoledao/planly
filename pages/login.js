import {
  Center,
  Container,
  Box,
  Text,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
} from "@chakra-ui/react"
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link'

import { useAuth } from '../components/Auth';

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Please fill out the email field"),
  password: yup.string().required("Please fill out the password field"),
});

export default function Login() {
  
  const [auth, { login }] = useAuth();

  const router = useRouter();

  useEffect(() => {
    auth.user ? router.push('/scheduler') : router.push('/login');
  },[auth.user])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: login,
    validationSchema,
    initialValues: {
      email: "",      
      password: ""
    }
  })

  return (  
    <Center h="100vh">
      <Container>

        <Box paddingTop={0}>
          <Heading variant="logo" paddingBottom={4}> planly </Heading>
          <Text paddingBottom={4}>Crie sua agenda compartilhada</Text>
        </Box>

        <Box paddingTop={4}>

          <FormControl isRequired id="email" paddingBottom={2}>
            <FormLabel>Email</FormLabel>
              <Input variant="styled" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />        
              {touched.email && <FormHelperText textColor="red"> {errors.email} </FormHelperText>}
          </FormControl>

          <FormControl isRequired id="password" paddingBottom={10}>
            <FormLabel>Senha</FormLabel>
              <Input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />        
              {touched.password && <FormHelperText textColor="red"> {errors.password} </FormHelperText>}
          </FormControl>

          </Box>

          <Button width="100%" onClick={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>Entrar</Button>
          <Link href="/signup">Ainda não tem uma conta? Cadastre-se!</Link>

        </Container>
      </Center>
  )
}