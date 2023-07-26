import React, { useEffect, useContext } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// COMPONENTS
import AuthMainNavigation from './src/Navigation/AuthMainNavigation';
import StatusBarComp from './src/Components/StatusBarComp';

// CONTEXTS
import { ThemeProvider } from './ThemeContext';
import { GlobalContextProvider } from './GlobalContexts'
import { LogBox } from 'react-native';


// import 'react-native-get-random-values';

LogBox.ignoreLogs(['@firebase/firestore: Firestore (10.0.0): Uncaught Error in snapshot listener: FirebaseError: [code=permission-denied]: Missing or insufficient permissions.']);

// LogBox.ignoreAllLogs();

const App = () => {

    // FONT LOADED
    const [fontsLoaded] = useFonts({
        'Gilroy-Bold': require('./assets/Fonts/GilroyBold.ttf'),
        'Gilroy-SemiBold': require('./assets/Fonts/GilroySemiBold.ttf'),
        'Gilroy-Medium': require('./assets/Fonts/GilroyMedium.ttf'),
    });

    // AWAIT SPLASHSCREEN
    useEffect(() => {
        const prepare = async () => {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Retraso de 2 segundos
        SplashScreen.hideAsync();
    };

    prepare();
    }, []);


    if (!fontsLoaded) {
        return (null); // Aqui se puede mostrar un mensaje si no se cargaron las fuentes
    }

    return (
        <>
            <GlobalContextProvider>
                <ThemeProvider>
                    <AuthMainNavigation />
                    <StatusBarComp />
                </ThemeProvider>
            </GlobalContextProvider>
        </>
    );
};

export default App;
