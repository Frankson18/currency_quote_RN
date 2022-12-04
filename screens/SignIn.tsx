import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SignInSocialButton } from "../components/SignInSocialButton";
import { useAuth } from "../hooks/auth";

export default function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Bem-vindo(a){'\n'}
          INVESTE AGORA 💰
        </Text>
        <Text style={styles.subtitle}> Controle suas 
            finanças de forma
            muito simples</Text>
      </View>
      <View style={styles.footer}>
        <SignInSocialButton title="Entrar com Google" svg={require("../assets/google.svg")} onPress={handleSignInWithGoogle} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091018',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
