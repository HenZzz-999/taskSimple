import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useContext } from 'react'
import MainContainerViewsSignIn from '../../Components/Containers/MainContainerViewsSignIn';
import TagMenuHeaderSignIn from '../../Components/TagHeaderViews/TagMenuHeaderSignIn';
import MediumText from '../../Components/Texts/MediumText';
import SmallText from '../../Components/Texts/SmallText';

import BottomSheetDef from '../../Components/BottomSheets/BottomSheetDef';


import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeContext } from '../../../ThemeContext';
import CustomBackdrop from '../../Components/BottomSheets/CustomBackdrop';

import { StatusBar } from 'expo-status-bar';

const Prueba = () => {

    // const { handlePressBtn, arrayRefs } = useContext(GlobalContexts);

    
    const { selectedTheme } = useContext(ThemeContext);
    
    // OPEN MODAL ADD NOTE
    const snapPoint = [ "20%", "35%", "96%" ]
    
    const sheetRef = useRef(null);
    
    const arrayRefAddNoteOpen = () => {
        sheetRef.current?.present();
        console.log(sheetRef.current?.snapPoint);
    }

    const closeModalDinamic = () => {
        sheetRef.current?.close()
    }

    // const [borderRadiusTop, setBordeRadiusTop] = useState(30)

    const handleOnChange = useCallback(index => {
        // if (index === 1) {
        //     setBordeRadiusTop(0)
        // } else {
        //     setBordeRadiusTop(30)
        // }
        
        console.log(index)
    }, [])

    return (
        <>
            <StatusBar style={selectedTheme.statusBarStyle} translucent = {false}/>
            <TagMenuHeaderSignIn titleMenuHeader='Prueba'/>
            <MainContainerViewsSignIn altStyles={{paddingBottom: 10, flex: 1, marginHorizontal: 0, paddingHorizontal: 20}}
            contentContainer={
                <>
                    <Text>Prueba</Text>
                    <Pressable onPress={() => {arrayRefAddNoteOpen()}}>
                        <Text>Abrir</Text>
                    </Pressable>
                    <Pressable onPress={() => {closeModalDinamic()}}>
                        <Text>Cerrar</Text>
                    </Pressable>
                </>
            } />

            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={sheetRef}
                    snapPoints={snapPoint}
                    enablePanDownToClose={true}
                    // handleStyle={{height: 0}}
                    handleIndicatorStyle={{backgroundColor: selectedTheme.darkSecundary,}}
                    backgroundStyle={{backgroundColor: selectedTheme.darkAccent, borderRadius: 30, }}
                    backdropComponent={(props) => <CustomBackdrop {...props} close={() => {sheetRef.current?.close()}} />}
                    index={0}
                    onChange={handleOnChange}
                >
                    <View style={{flex: 1, marginHorizontal: 20, marginTop: 10}}>
                        <Pressable onPress={() => console.log('Crear nueva nota')}>
                            <MediumText altStyle={{fontSize: 16}} textValue='Crear nueva nota'/>
                        </Pressable>
                        <View style={{marginTop: 25}}>
                            <Pressable onPress={() => console.log('Importar nota')}>
                                <MediumText altStyle={{fontSize: 16}} textValue='Importar nota'/>
                                <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 10, color: '#696969', marginTop: 3}}>Agrega la nota de otro usuario</Text>
                            </Pressable>
                        </View>
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            {/* <BottomSheetDef sheetRef={arrayRefs.ref1} snapPoint={snapPoint}
            contentModal={
                <>
                    <View style={{flex: 1, marginHorizontal: 20, marginTop: 10}}>
                        <Pressable onPress={() => console.log('Crear nueva nota')}>
                            <MediumText altStyle={{fontSize: 16}} textValue='Crear nueva nota'/>
                        </Pressable>
                        <View style={{marginTop: 25}}>
                            <Pressable>
                                <MediumText altStyle={{fontSize: 16}} textValue='Importar nota'/>
                                <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 10, color: '#696969', marginTop: 3}}>Agrega la nota de otro usuario</Text>
                            </Pressable>
                        </View>
                    </View>
                </>
            }/> */}
        </>
    )
}

export default Prueba;