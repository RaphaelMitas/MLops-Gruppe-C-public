import React, {useContext, useEffect, useState} from "react";
import googleAuthProvider, {auth} from "../api/firebase";
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

const AuthContext = React.createContext({
  currentUser: null,
  loading: false,
  signIn: () => null,
  logout: () => null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  function signIn () {
    signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      setCurrentUser(result.user);

      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      setLoading(false);
    });
  }, []);

  const value =
      {currentUser, loading, signIn, logout};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

