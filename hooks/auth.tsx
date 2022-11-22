import React, { createContext, useContext, ReactNode } from 'react';

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'johnDoe@mail.com',
  };

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = '277679707012-pu6nf0kjtku3a77ncaf67pie9mi5s8s3.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@futurosenior/currencyquote';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log("response", response);

    } catch (error) {
      throw new Error(error);
    }
    
  }

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };