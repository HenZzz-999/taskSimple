import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar';

import MainContainerSignOut from '../../../src/Components/Containers/MainContainerViewsSignOut'
import MainButton from '../../Components/Buttons/MainButton'

import { ThemeContext } from '../../../ThemeContext';


const Welcome = ({navigation}) => {

    const { selectedTheme } = useContext(ThemeContext);

    const handleOnPress = () => {
        console.log('presionado')
    }


  return (
    <>
    <StatusBar style="light" translucent = {true} hidden = {true} />
        <MainContainerSignOut altStyles={{marginHorizontal: 0, paddingTop: 0, paddingBottom: 0, flex: 1}}
        contentContainer={
        <>
            <Image source = {require('../../../assets/Images/welcome-screen-bg.png')} style = {{width: '100%', height: 400, top: -10}}></Image>
            <View style = {styles.contentBoxTitle}>
                <View style={{}}>
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 32, color: selectedTheme.whiteColor, textAlign: 'center', lineHeight: 42}}>
                        Simplifica tus notas con <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 32, color: selectedTheme.accent}}>taskSimple</Text>
                    </Text>
                    <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, textAlign: 'center', paddingTop: 13, lineHeight: 20, color: selectedTheme.whiteColor}}>
                        Coloca todas tus notas en un solo lugar y colabora con otras personas en ellas
                    </Text>
                </View>
                <View style={{alignItems: 'center', marginBottom: 30,}}>
                    <MainButton onPress={() => navigation.navigate('SignUp')} buttonText="Comenzar!"></MainButton>
                    <View style={styles.signInBox}>
                        <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.whiteColor}}>¿Ya tienes una cuenta? </Text>
                        <Pressable onPress={() => navigation.navigate('SignIn')}>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.accent}}>
                                Inicia Sesion
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
        }/>
    </>
    )
}

export default Welcome

const styles = StyleSheet.create({
    contentBoxTitle: {
        paddingTop: 60,
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'space-between',
        flex: 1,
    },
    titleWelcome: {
        fontFamily: 'Gilroy-Bold',
        textAlign: 'center',
        lineHeight: 42
    },
    subTilteWelcome: {
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 13,
        lineHeight: 20
    },
    signInBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signInTitle: {
        fontFamily: 'Gilroy-SemiBold',
        color: 'white',
    },
})