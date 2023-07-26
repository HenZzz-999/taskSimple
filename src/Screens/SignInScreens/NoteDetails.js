import { Alert, StyleSheet, Text, View, useWindowDimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

import { ThemeContext } from '../../../ThemeContext';

import { StatusBar } from 'expo-status-bar';
import MainContainerViewsSignIn from '../../Components/Containers/MainContainerViewsSignIn';
import TagHeaderNoteDetails from '../../Components/TagHeaderViews/TagHeaderNoteDetails';
import MediumText from '../../Components/Texts/MediumText';
import { Image } from 'expo-image';
import MainButton from '../../Components/Buttons/MainButton';
import ButtonIconAccent from '../../Components/Buttons/ButtonIconAccent';
import MainButtonAccent from '../../Components/Buttons/MainButtonAccent';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase';



const NoteDetails = ({ route, navigation }) => {

    const { notes } = route.params;
    const dimensions = useWindowDimensions();
    const { selectedTheme } = React.useContext(ThemeContext);

    // console.log(dimensions)

    const deleteNoteFromFirebase = async () => {
        try {
            const userDocRef = doc(collection(FIRESTORE_DB, 'users'), FIREBASE_AUTH.currentUser.email);
            const notesCollectionRef = collection(userDocRef, 'notes');
            const querySnapshot = await getDocs(notesCollectionRef);
            const matchingDoc = querySnapshot.docs.find((doc) => doc.data().titleNote === notes.titleNote);

            if (matchingDoc) {
                await deleteDoc(matchingDoc.ref);
                navigation.goBack();
                console.log('Nota eliminada exitosamente');
                // console.log(matchingDoc);
                // Aquí puedes realizar otras acciones después de eliminar la nota
            } else {
                console.log('No se encontró la nota para eliminar');
            }
        } catch (error) {
            console.error('Error al eliminar la nota:', error);
        }
    };

    return (
        <>
            <StatusBar style={selectedTheme.statusBarStyle} backgroundColor={selectedTheme.darkAccent} translucent = {false} hidden = {false}/>
            {/* <SafeAreaView> */}
            <View style={[styles.mainContainerStyle, {backgroundColor: selectedTheme.darkAccent,}]}>
                <View style={[styles.mainContainerStyleContent]}>
                    <TagHeaderNoteDetails tagTextValue='Añadir Nota' onPressEdit={() => {navigation.push('UpdateNote', { notes })}}/>
                    <View style={{flexDirection: 'column', gap: 30, flex: 1,}}>
                        <View style={{flexDirection: 'column', gap: 35, marginHorizontal: 20,}}>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 28, color: selectedTheme.whiteColor,}}>{notes.titleNote}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                                <View>
                                    <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.darkAccentSec,}}>Creado por</Text>
                                    <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.shareColor,}}>{notes.createdby}</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                        <Image
                                            style={{width: 25, height: 20, tintColor: selectedTheme.darkAccentSec }}
                                            contentFit="contain"
                                            source={require('../../../assets/Icons/members_icon.png')}/>
                                        <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.darkAccentSec,}}>{notes.members}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 2, borderColor: selectedTheme.accent, padding: 5, borderRadius: 10}}>
                                        <Image
                                            style={{width: 25, height: 20, tintColor: selectedTheme.accent }}
                                            contentFit="contain"
                                            source={require('../../../assets/Icons/calendar_icon.png')}/>
                                        <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.accent,}}>{notes.deadline}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{backgroundColor: selectedTheme.darkBg, flex: 1, borderTopEndRadius: 40, borderTopLeftRadius: 40}}>
                            <View style={{marginHorizontal: 20, flex: 1}}>
                                <View style={{marginTop: 25, flex: 1}}>
                                    <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.darkAccentSec, lineHeight: 18}}>{notes.descriptionNote}</Text>
                                </View>
                                <View style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                                    <MainButtonAccent onPress={deleteNoteFromFirebase} accentColorBg={selectedTheme.btnAlertAccentBgColor} accentColorText={selectedTheme.delateColor} buttonText="Eliminar nota" altStyle={{width: '100%'}}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/* </SafeAreaView> */}
        </>
    )
}

export default NoteDetails

const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
    },
    mainContainerStyleContent: {
        paddingTop: 20,
        // paddingBottom: 90,
        // marginHorizontal: 20,
        flex: 1,
    }
})