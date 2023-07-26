import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import { StatusBar } from 'expo-status-bar';
import TagHeaderSignOut from '../../Components/TagHeaderViews/TagHeaderSignOut';
import MainContainerSignOut from '../../Components/Containers/MainContainerViewsSignOut';
import MainButton from '../../Components/Buttons/MainButton';
import { signOut } from '@firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase';
import TagHeaderAddNote from '../../Components/TagHeaderViews/TagHeaderAddNote';
import MediumText from '../../Components/Texts/MediumText';

const Settings = () => {
    const { isDarkTheme, selectedTheme, handleSignout, toggleTheme } = useContext(ThemeContext);

    // const handleSignout = async () => {
    //     signOut(FIREBASE_AUTH).then(console.log('Sign Out'))
    // }

    return (
        <>
        <StatusBar style={selectedTheme.statusBarStyle} backgroundColor={selectedTheme.darkAccent} translucent = {false}/>
            <View style={[styles.mainContainerStyle, {backgroundColor: selectedTheme.darkAccent,}]}>
                <View style={styles.mainContainerStyleContent}>
                    <TagHeaderAddNote tagTextValue='Settings'/>
                    <View style={{ backgroundColor: selectedTheme.darkAccent, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'center', flex: 1}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <MediumText textValue={selectedTheme.titleTheme}/>
                            <Switch
                                trackColor={{ false: selectedTheme.darkBg, true: selectedTheme.darkBg }}
                                thumbColor={isDarkTheme ? selectedTheme.accent : selectedTheme.accent}
                                ios_backgroundColor={selectedTheme.darkBg}
                                onValueChange={toggleTheme}
                                value={isDarkTheme}
                            />
                        </View>
                    </View>
                    <View style={{}}>
                        <MainButton onPress={handleSignout} buttonText='Cerrar sesion'/>
                    </View>
                </View>
            </View>
        </>
    );
};

export default Settings;

const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
    },
    mainContainerStyleContent: {
        paddingTop: 40,
        marginHorizontal: 20,
        marginBottom: 15,
        flex: 1
    }
})
