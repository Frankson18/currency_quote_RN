import React from "react";
import { Alert, Text, View } from "react-native";
import SignInSocialButton from "../components/SignInSocialButton";
import { useAuth } from "../hooks/auth";

export default function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("Tiago: ", error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }
  return (
    <View>
      <SignInSocialButton title="Sign in with Google" onPress={handleSignInWithGoogle} />
    </View>
  )
}