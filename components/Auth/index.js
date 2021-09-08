import React,{ createContext, useState, useEffect, useContext } from "react"
import axios from 'axios';

import firebaseClient, {persistentMode} from "../../config/firebase/client";

const AuthContext = createContext([{},() => {}]);

export const signup = async ( {email, password, username} ) => {
  try {
    await firebaseClient.auth().createUserWithEmailAndPassword(email, password);

    const user = await login( {email, password} );
    const token = await user.getIdToken();

    const { data } = await axios({
      method: 'post',
      url: '/api/profile',
      data: { username },
      headers: {
        'Authorization': `Bearer ${token}`
      },        
    })
    
  } catch (error) {
    console.log("Signup Error:", error);
  }
}

export const login = async ( {email, password} ) => {
  firebaseClient.auth().setPersistence(persistentMode);
  try {
    await firebaseClient.auth().signInWithEmailAndPassword(email, password);
    return firebaseClient.auth().currentUser;
  } catch (error) {
    console.log("Login Error:", error);
  }
}

const logout = () => {
  firebaseClient.auth().signOut();
}

export const useAuth = () => {
  const [auth] = useContext(AuthContext);
  return [auth, { signup, login, logout }]
}

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({
    loading: true,
    user: false
  })

  useEffect(() =>  {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(
      user => setAuth({loading: false, user})
    );

    return () => unsubscribe()
  }, [])

  return(
    <AuthContext.Provider value={[auth, setAuth]} >
      {children}
    </AuthContext.Provider>
  ) 
}