import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SignedOutStack  from './StackNavigationSignOut';
import SignedInStack  from './StackNavigationSignIn';

import { ThemeContext } from '../../ThemeContext';

import { FIREBASE_AUTH } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import MediumText from '../Components/Texts/MediumText';

const MainNavigation = () => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const { selectedTheme } = useContext(ThemeContext);
    const [themeDefBg, setThemeDefBg] = useState(selectedTheme.darkBg)

    const MyTheme = {
        ...DefaultTheme,
        colors: {
        ...DefaultTheme.colors,
        background: themeDefBg,
        },
    };


    // FIREBASE AUTH 
    const userHandler = (user) => {
        user ? setCurrentUser(user) : setCurrentUser(null)
        user ? setThemeDefBg(selectedTheme.darkAccent) : setThemeDefBg(selectedTheme.darkBg)
    }
    

    useEffect(() => onAuthStateChanged(FIREBASE_AUTH, (user) => {
        userHandler(user)
        setLoading(false);
    }), [])

    return (
        <>
            {loading ? (
                <>
                    <StatusBar style={selectedTheme.statusBarStyle} backgroundColor={selectedTheme.darkBg} translucent = {false}/>
                    <View style={{ backgroundColor: selectedTheme.darkBg, padding: 20, flex: 1 }}>
                        <View style={{ marginBottom: 20, flex: 1 }}>
                            <MediumText textValue="Preparando todos los views..." altStyle={{ fontSize: 17, textAlign: 'center' }} />
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <NavigationContainer theme={MyTheme}>
                        { currentUser ? <SignedInStack /> : <SignedOutStack /> }
                    </NavigationContainer>
                </>
            )}
        </>
    );
};

export default MainNavigation;