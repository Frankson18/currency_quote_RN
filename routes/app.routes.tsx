import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import Historic from '../screens/Historic';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} >
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
  )
}