import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()
import firstPage from './screen/firstPage'
import openApp from './screen/openApp';
import onBoarding from "./screen/onBoarding"
import loginPage from "./screen/loginPage"
import mainPage from "./screen/mainPage"
import takePhoto from "./screen/takePhoto"
import takeBarcode from "./screen/takeBarcode"
import afterPhoto from "./screen/afterPhoto"


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="firstPage" component={firstPage} options={{ headerShown: false }}/>
          <Stack.Screen name="openApp" component={openApp} options={{ headerShown: false }}/>
          <Stack.Screen name="onBoarding" component={onBoarding} options={{ headerShown: false }}/>
          <Stack.Screen name="loginPage" component={loginPage} options={{ headerShown: false }}/>
          <Stack.Screen name="mainPage" component={mainPage} options={{ headerShown: false }}/>
          <Stack.Screen name="takePhoto" component={takePhoto} options={{ headerShown: false }}/>
          <Stack.Screen name="takeBarcode" component={takeBarcode} options={{ headerShown: false }}/>
          <Stack.Screen name="afterPhoto" component={afterPhoto} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
