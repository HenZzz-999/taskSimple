import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, LogBox, Alert, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';

import HomeScreen from '../Screens/SignInScreens/HomeScreen';
import PruebaScreen from '../Screens/SignInScreens/Prueba';
import SettingsScreen from '../Screens/SignInScreens/Settings';
import { Image } from 'expo-image';
import MediumText from '../Components/Texts/MediumText';

import { ThemeContext } from '../../ThemeContext';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {

    useEffect(() => {
        LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
    }, [])

    // const _webBrowseProyectButtonAsync = async () => {
    //     let result = await WebBrowser.openBrowserAsync('https://expo.dev');
    //     setResult(result);
    // };

    const navigation = useNavigation();

    const _SettingsdrawerClose = () => {
        navigation.navigate('Ajustes')
        setTimeout(() => {
            props.navigation.closeDrawer()
        }, 400)
    }
    const _AboutProyectdrawerClose = () => {
        navigation.navigate('AboutProyect')
        setTimeout(() => {
            props.navigation.closeDrawer()
        }, 400)
    }

    const { selectedTheme } = useContext(ThemeContext);


    const [currentLoggedInUser, setCurrentLoggedInUser] = useState([])

    const getUserName = () => {
        try {
            const user = FIREBASE_AUTH.currentUser
            const queryUser = query(
                collection(FIRESTORE_DB, 'users'),
                where('owner_uid', '==', user.uid),
                limit(1)
                );

            const snapshotUser = onSnapshot(queryUser, (snapshot) => {
                snapshot.docs.map(doc => {
                    setCurrentLoggedInUser({
                        userName: doc.data().name,
                        lastName: doc.data().lastName
                    })
                })
            })
            return snapshotUser
            } catch (error) {
                Alert.alert(error.message);
            }
        }

    useEffect(() => {
        getUserName();
        console.log(FIREBASE_AUTH.currentUser.email)
    }, [])
        return (
            <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0, height: '100%' }} {...props}>
                {/* Sección adicional */}
                <SafeAreaView>
                <View style={{ paddingBottom: 10, height: '100%', flexDirection: 'column', justifyContent: 'space-between', }}>
                    <View>
                        <View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: selectedTheme.darkAccent,}}>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 23, marginBottom: 4, color: selectedTheme.whiteColor,}}>{currentLoggedInUser.userName + " " + currentLoggedInUser.lastName}</Text>
                            <Text style={{fontSize: 13, fontFamily: 'Gilroy-SemiBold', color: selectedTheme.darkAccentSec}}>{FIREBASE_AUTH.currentUser.email}</Text>
                            <Text style={{fontSize: 13, fontFamily: 'Gilroy-SemiBold', color: selectedTheme.accent, marginTop: 10}}>Mas funciones proximamente</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <DrawerItemList {...props} />
                        </View>
                    </View>
                    <View>
                        <DrawerItem style={{borderRadius: 12,}} icon={({focused}) => (
                                <Image
                                source={require('../../assets/Icons/settings_drawer_icon.png')}
                                contentFit="contain"
                                style={{width: 25, height: 25, tintColor: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer, marginRight: -13, marginLeft: 10,}}
                            />
                            )} label={({focused}) => (
                                <Text style={{fontSize: 15, fontFamily: 'Gilroy-SemiBold', color: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer}}>Ajustes</Text>
                            )} onPress={_SettingsdrawerClose} />
                        <DrawerItem style={{borderRadius: 12,}} icon={({focused}) => (
                            <Image
                            source={require('../../assets/Icons/question_drawer_icon.png')}
                            contentFit="contain"
                            style={{width: 25, height: 25, tintColor: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer, marginRight: -13, marginLeft: 10,}}
                        />
                        )} label={({focused}) => (
                            <Text style={{fontSize: 15, fontFamily: 'Gilroy-SemiBold', color: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer}}>Sobre el proyecto</Text>
                        )} onPress={_AboutProyectdrawerClose} />
                        
                        {/* <DrawerItem style={{borderRadius: 12,}} icon={({focused}) => (
                            <Image
                            source={require('../../assets/Icons/question_drawer_icon.png')}
                            contentFit="contain"
                            style={{width: 25, height: 25, tintColor: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer, marginRight: -13, marginLeft: 10,}}
                        />
                        )} label={({focused}) => (
                            <Text style={{fontSize: 15, fontFamily: 'Gilroy-SemiBold', color: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer}}>Sobre el proyecto</Text>
                        )} onPress={_webBrowseProyectButtonAsync} /> */}
                    </View>
                </View>
                </SafeAreaView>
            </DrawerContentScrollView>
        );
    };

const DrawerNavigation = () => {

    const { selectedTheme } = useContext(ThemeContext);


    return (
    <Drawer.Navigator initialRouteName="Notas" drawerContent={CustomDrawerContent} screenOptions={{
        headerShown: false,
        drawerStyle: {
            backgroundColor: selectedTheme.darkBg,
        },
        drawerActiveBackgroundColor: selectedTheme.accentTabsDrawer,
        drawerInactiveBackgroundColor: '#00000000',
        drawerItemStyle: {
            borderRadius: 12,
            // paddingLeft: 10,
            paddingVertical: 1
        },
        drawerType: 'front',
        drawerPosition: 'left',
        swipeEnabled: true,
        // drawerHideStatusBarOnOpen: 'true',
        drawerLabelStyle: {
            fontSize: 15,
            fontFamily: 'Gilroy-SemiBold'
        },
    }}>
        <Drawer.Screen name="Notas" component={HomeScreen}
            options = {{
                drawerIcon: ({focused}) => (
                    <Image
                        source={require('../../assets/Icons/notes_drawer_icon.png')}
                        contentFit="contain"
                        style={{width: 25, height: 25, tintColor: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer, marginRight: -13, marginLeft: 10,}}
                    />
                ),
                drawerLabel: ({focused}) => (
                    <Text style={{fontSize: 15, fontFamily: 'Gilroy-SemiBold', color: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer}}>Notas</Text>
                ),
            }}/>

        <Drawer.Screen name="Prueba" component={PruebaScreen}
            options = {{
                drawerIcon: ({focused}) => (
                    <Image
                        source={require('../../assets/Icons/notes_ready_drawer_icon.png')}
                        contentFit="contain"
                        style={{width: 25, height: 25, tintColor: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer, marginRight: -13, marginLeft: 10,}}
                    />
                ),
                drawerLabel: ({focused}) => (
                    <Text style={{fontSize: 15, fontFamily: 'Gilroy-SemiBold', color: focused ? selectedTheme.textIconTabsDrawer : selectedTheme.inactivetextIconTabsDrawer}}>Prueba</Text>
                )
                }}/>
    </Drawer.Navigator>
);
}

export default DrawerNavigation;
