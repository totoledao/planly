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
} from "@chakra-ui/react"
import Link from 'next/link'

import { useFormik } from 'formik';
import * as yup from 'yup';
import firebase, { persistentMode } from '../../config/firebase';

import styles from '../../styles/Home.module.css';

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Please fill out the email field"),
  password: yup.string().required("Please fill out the password field"),
});

export default function Login() {
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
      firebase.auth().setPersistence(persistentMode);
      const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
      console.log(await user);
    },
    validationSchema,
    initialValues: {
      email: "",      
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

    </Box>

    <Button width="100%" onClick={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>Entrar</Button>
    <Link href="/signup">Ainda não tem uma conta? Cadastre-se!</Link>
    
    </Container>
    
  )
}
