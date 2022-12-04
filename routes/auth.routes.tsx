import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import SignIn from '../screens/SignIn';

const Stack = createStackNavigator();


export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} >
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false, }}/>
    </Stack.Navigator>
  );
}
