import { View, Text, LogBox } from 'react-native'
import React, { useEffect } from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeNotesScreen from '../Screens/SignInScreens/HomeScreen'
import PruebaScreen from '../Screens/SignInScreens/Prueba'
import SettingsScreen from '../Screens/SignInScreens/Settings'
import DrawerNavigation from './DrawerNavigation';
import AddNoteScreen from '../Screens/SignInScreens/AddNewNote';
import NoteDetailsScreens from '../Screens/SignInScreens/NoteDetails';
import UpdateNoteScreen from '../Screens/SignInScreens/UpdateNote';
import AboutProyect from '../Screens/SignInScreens/AboutProyect';

const Stack = createStackNavigator ();

const screenOptionsMainStack = {
    headerShown: false,
    gestureEnabled: false
}

const SignedInStack = () => {

    useEffect(() => {
        LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);
    }, [])

    return (
        <Stack.Navigator
        screenOptions={screenOptionsMainStack}
        initialRouteName="DrawerInit">
            <Stack.Screen name="DrawerInit" component={DrawerNavigation} options = {{headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS}}/>
            <Stack.Screen name="Ajustes" component={SettingsScreen} options = {{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}/>
            <Stack.Screen name="AboutProyect" component={AboutProyect} options = {{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}/>
            <Stack.Screen name="AddNote" component={AddNoteScreen} options = {{headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS, gestureEnabled: true}}/>
            <Stack.Screen name="UpdateNote" component={UpdateNoteScreen} options = {{headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS, gestureEnabled: true}}/>
            <Stack.Screen name="NoteDetails" component={NoteDetailsScreens} options = {{headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS, gestureEnabled: true}}/>
            <Stack.Screen name="Prueba" component={PruebaScreen} options = {{headerShown: false,}}/>
        </Stack.Navigator>
    );
  };

// Para desactivar las animaciones totalmente en el screen utilizar 'animationEnabled: false' osea 'headerShown: false, animationEnabled: false,...TransitionPresets.SlideFromRightIOS'

export default SignedInStack;