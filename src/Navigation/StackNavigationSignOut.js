import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import WelcomeScreen from '../Screens/SignOutScreens/Welcome'
import SignInScreen from '../Screens/SignOutScreens/SignIn'
import SignUpScreen from '../Screens/SignOutScreens/SignUp'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator ();

const screenOptionsMainStack = {
    headerShown: false,
    gestureEnabled: true,
}

const SignedOutStack = () => {
    return (
        <Stack.Navigator
        screenOptions={screenOptionsMainStack}
        initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options = {{headerShown: false,}}/>
            <Stack.Screen name="SignIn" component={SignInScreen} options = {{headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid,}}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options = {{headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid,}}/>
        </Stack.Navigator>
    );
  };


// Para desactivar las animaciones totalmente en el screen utilizar 'animationEnabled: false' osea 'headerShown: false, animationEnabled: false,...TransitionPresets.SlideFromRightIOS'

export default SignedOutStack;