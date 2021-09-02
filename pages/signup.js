import { 
  Container,
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
} from "@chakra-ui/react"
import Link from 'next/link'

import { useFormik } from 'formik';
import * as yup from 'yup';
import firebaseClient from '../config/firebase';

import styles from '../styles/Home.module.css'

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Please fill out the email field"),
  password: yup.string().required("Please fill out the password field"),
  username: yup.string().required("Please fill out the username field"),
});

export default function Signup() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async (values, form) => {
      const user = await firebaseClient.auth().createUserWithEmailAndPassword(values.email, values.password);
      console.log(user);
    },
    validationSchema,
    initialValues: {
      email: "",
      username: "",
      password: ""
    }
  })

  return (
    <Container flex={1}>

    <Box paddingTop={4}>
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

    <Button width="100%" onClick={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>Entrar</Button>
    
    <Link href="/">Já tem tem uma conta? Clique aqui!</Link>
    
    </Container>
    
  )
}
