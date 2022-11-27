import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import HomeScreen from './screens/HomeScreen';
import Historic from "./screens/Historic";
import SignIn from "./screens/SignIn";
import { AuthProvider } from "./hooks/auth";
import { Routes } from "./routes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}