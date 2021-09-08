import React,{ createContext, useState, useEffect, useContext } from "react"

import firebaseClient, {persistentMode} from "../../config/firebase/client";

const AuthContext = createContext([{},() => {}]);

export const signup = async ( {email, password} ) => {
  try {
    await firebaseClient.auth().createUserWithEmailAndPassword(email, password);
    await login(email, password);
    //TODO setupProfile( {token, username} )
    // const { data } = await axios({
    //   method: 'post',
    //   url: '/api/profile',
    //   data: {
    //     username: values.username
    //   },
    //   header: {
    //     'Authentication': `Bearer ${user.getToken()}`
    //   },        
    // })
  } catch (error) {
    console.log("Signup Error:", error);
  }
}

export const login = async ( {email, password} ) => {
  firebaseClient.auth().setPersistence(persistentMode);
  try {
    await firebaseClient.auth().signInWithEmailAndPassword(email, password);
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