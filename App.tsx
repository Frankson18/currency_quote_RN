import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import HomeScreen from './screens/HomeScreen';
import Historic from "./screens/Historic";
import SignIn from "./screens/SignIn";
import { AuthProvider } from "./hooks/auth";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}>
        

        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, }} />
        <Stack.Screen name="Historic" component={Historic} options={
          {
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTitleStyle: {
              opacity: 0,
            },
            headerTintColor: '#fff',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}