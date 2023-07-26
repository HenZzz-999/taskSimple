import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../../ThemeContext';
import TagHeaderAddNote from '../../Components/TagHeaderViews/TagHeaderAddNote';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

import { Shadow } from 'react-native-shadow-2';

const AboutProyect = () => {

    const { selectedTheme } = useContext(ThemeContext);

    const _configsShadow = {
        distance: 15,
        startColor: selectedTheme.shadowColorAccent,
        finalColor: 'rgba(167, 199, 250)',
        childColor: selectedTheme.accentIcon,
    }

    // const distance = 10

    return (
        <>
            <StatusBar style={selectedTheme.statusBarStyle} backgroundColor={selectedTheme.darkBg} translucent = {false}/>
            <View style={[styles.mainContainerStyle, {backgroundColor: selectedTheme.darkBg,}]}>
                <View style={styles.mainContainerStyleContent}>
                    <TagHeaderAddNote tagTextValue=''/>
                    <View style={{justifyContent: 'center', alignContent: 'center', flexDirection: 'row', marginBottom: 35}}>
                        <Shadow
                            distance = {_configsShadow.distance}
                            offset = {[0, 5]}
                            viewStyle={{ backgroundColor: _configsShadow.childColor }}
                            startColor = {_configsShadow.startColor}
                            finalColor = {_configsShadow.finalColor}>
                            <View style={{padding: 15, backgroundColor: selectedTheme.inactivetextIconTabsDrawer, borderRadius: 26}}>
                                <Image source={require('../../../assets/Icons/bolt-icon.png')} contentFit='contain' style={{width: 65, height: 65}}/>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{marginBottom: 40}}>
                        <Text style={{fontFamily: 'Gilroy-Bold', color: selectedTheme.whiteColor, fontSize: 25, textAlign: 'center', lineHeight: 34}}>Ahorra tiempo creando notas en taskSimple</Text>
                    </View>
                    <View>
                        <Text style={{fontFamily: 'Gilroy-Bold', color: selectedTheme.whiteColor, fontSize: 17, marginBottom: 5, lineHeight: 23}}>Principales funciones y futuras de taskSimple:</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15, }}>
                            <Image source={require('../../../assets/Icons/check_icon.png')} contentFit='contain' style={{width: 20, height: 20, tintColor: selectedTheme.checkColor, }}/>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', color: selectedTheme.whiteColor, fontSize: 16, marginLeft: 30, lineHeight: 20, marginRight: 20}}>Poder crear, editar y eliminar notas de una manera facil y sencilla</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15, }}>
                            <Image source={require('../../../assets/Icons/cruz_icon.png')} contentFit='contain' style={{width: 20, height: 20, tintColor: selectedTheme.delateColor, }}/>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', color: selectedTheme.whiteColor, fontSize: 16, marginLeft: 30, lineHeight: 20, marginRight: 20}}>Marcar tareas como completadas</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15, }}>
                            <Image source={require('../../../assets/Icons/cruz_icon.png')} contentFit='contain' style={{width: 20, height: 20, tintColor: selectedTheme.delateColor, }}/>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', color: selectedTheme.whiteColor, fontSize: 16, marginLeft: 30, lineHeight: 20, marginRight: 20}}>Invitar a otros usuarios a colaborar en una nota</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15, }}>
                            <Image source={require('../../../assets/Icons/cruz_icon.png')} contentFit='contain' style={{width: 20, height: 20, tintColor: selectedTheme.delateColor, }}/>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', color: selectedTheme.whiteColor, fontSize: 16, marginLeft: 30, lineHeight: 20, marginRight: 20}}>Compatir notas a otros usuarios como pdf, texto o exportada</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default AboutProyect

const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
    },
    mainContainerStyleContent: {
        paddingTop: 40,
        marginHorizontal: 25,
        marginBottom: 15,
        flex: 1
    }
})