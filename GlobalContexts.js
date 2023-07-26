import React, { createContext, useState, useCallback, useRef } from 'react';
import { Animated } from 'react-native'

export const GlobalContexts = createContext();

export const GlobalContextProvider = ({ children }) => {

    // PROBAR SI FUNCIONA
    const textoContexto = 'Traido del contexto global';



    // OPEN & CLOSE BOTTOM SHEET
    const sheetRef = useRef(null);

    const arrayRefs = {
        ref1: useRef(null),
        ref2: useRef(null),
    }

    const [zIndex, setZIndex] = useState(-999)
    const colorBgPopUp = useRef(new Animated.Value(0)).current;


    const colorBgPopUpStyle = {
        backgroundColor: colorBgPopUp.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.25)']
        }),
    };

    const handlePressBtn = useCallback((index) => {
        // arrayRefs.ref1.current?.present();
        Animated.timing(colorBgPopUp, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
        setZIndex(999)
        // console.log('funciona desde el contexto')
    }, []);

    const handleClosePress = () => {
        // arrayRefs.ref1.current.close()
        Animated.timing(colorBgPopUp, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
        setTimeout(() => {
            setZIndex(-999)
        }, 500)
    }




    // EXPORT FUNCTIONS
    const globalContextValue = {
        textoContexto,

        // EXPORTS SHEETS
        arrayRefs,
        sheetRef,
        zIndex,
        colorBgPopUpStyle,
        handlePressBtn,
        handleClosePress
    };


    // RENDER
    return (
        <GlobalContexts.Provider value={globalContextValue}>
            {children}
        </GlobalContexts.Provider>
    );

}