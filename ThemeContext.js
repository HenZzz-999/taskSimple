import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { themeDark, themeLight } from './src/Components/Colors';
import { FIREBASE_AUTH } from './firebase';
import { signOut } from '@firebase/auth';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState('dark');
    const selectedTheme = isDarkTheme ? themeDark : themeLight;

    useEffect(() => {
        loadThemeFromStorage();
    }, []);

    const loadThemeFromStorage = async () => {
        try {
            const themeValue = await SecureStore.getItemAsync('theme');
            setIsDarkTheme(themeValue === 'dark');
        } catch (error) {
            console.log('Error loading theme from storage:', error);
        }
    };

    const saveThemeToStorage = async (value) => {
        try {
            await SecureStore.setItemAsync('theme', value);
        } catch (error) {
            console.log('Error saving theme to storage:', error);
        }
    };

    const handleSignout = async () => {
        try {
            await SecureStore.setItemAsync('theme', 'dark');
            signOut(FIREBASE_AUTH).then(() => console.log('Sign Out'));
            console.log('estoy funcionando desde handle');
        } catch (error) {
          console.log('Error saving theme to storage:', error);
        }
      };

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        saveThemeToStorage(newTheme ? 'dark' : 'light');
    };

    const themeContextValue = {
        isDarkTheme,
        selectedTheme,
        toggleTheme,
        handleSignout
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
};
