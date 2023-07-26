import { StyleSheet, Text, View, ScrollView, Pressable, SafeAreaView, Platform } from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { NOTES } from '../../../data/notes';

import MainContainerSignIn from '../../Components/Containers/MainContainerViewsSignIn';
import MediumText from '../../Components/Texts/MediumText';
import BigText from '../../Components/Texts/BigText';
import NotesHome from '../../Components/Notes/NotesHome';
import MainButtonAccent from '../../Components/Buttons/MainButtonAccent';
import { StatusBar } from 'expo-status-bar';
import BottomMenuHome from '../../Components/MenuHome/BottomMenuHome';

import { ThemeContext } from "../../../ThemeContext";
import TagMenuHeaderSignIn from '../../Components/TagHeaderViews/TagMenuHeaderSignIn';
import BottomSheetDef from '../../Components/BottomSheets/BottomSheetDef';
import { GlobalContexts } from '../../../GlobalContexts';

import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase';
import { collection, collectionGroup, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import NewSimpleNote from '../../Components/Notes/NewSimpleNote';
import { Col, Grid } from 'react-native-easy-grid';
import { Image } from 'expo-image';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../Components/BottomSheets/CustomBackdrop';



const HomeNotes = ({ navigation }) => {
    
    // THEME COLORS
    const { selectedTheme } = useContext(ThemeContext);

    // RENDER NOTES
    const [notes, setNote] = useState([])
    const [loading, setLoading] = useState(true); // Estado de carga


    // BottomSheet
    const [zIndex, setZIndex] = useState(-999)
    const snapPoint = [ 140 ];
    const sheetRef = useRef(null);

    const _openBottomSheet = () => {
        sheetRef.current?.present();
        setZIndex(999)
    }

    const _closeNavigateBottomSheet = () => {
        sheetRef.current?.close()
        navigation.navigate('AddNote')
    }

    const handleOnChange = useCallback(index => {
        if (index === -1) {
            setZIndex(-999)
        }
        console.log(index)
    }, [])

    const [totalMembers, setTotalMembers] = useState(0);

    // FIREBASE
    useEffect(() => {

        const userDocRef = doc(collection(FIRESTORE_DB, 'users'), FIREBASE_AUTH.currentUser.email);
        const notesCollectionRef = query(collection(userDocRef, 'notes'), orderBy('createdAt', 'desc'));

        const snapshotUser = onSnapshot(notesCollectionRef, (snapshot) => {
            // console.log((snapshot.docs.map(doc => doc.data())))

            let sum = 0;
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.members) {
                    sum += data.members;
                }
            });
            setTotalMembers(sum.toFixed(2));

            setNote(snapshot.docs.map(doc => doc.data()))
            setLoading(false);
        });

        return () => snapshotUser();

    }, [])

    
    // console.log(Platform)

    return (
        <>
            {loading ? (
                <>
                    <StatusBar style={selectedTheme.statusBarStyle} backgroundColor={selectedTheme.darkBg} translucent = {false}/>
                    <View style={{ backgroundColor: selectedTheme.darkBg, padding: 20, flex: 1 }}>
                        <View style={{ marginBottom: 20, flex: 1 }}>
                            <MediumText textValue="Preparando notas..." altStyle={{ fontSize: 17, textAlign: 'center' }} />
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <StatusBar style={selectedTheme.statusBarStyle} backgroundColor={selectedTheme.darkAccent} translucent = {false}/>
                    <TagMenuHeaderSignIn titleMenuHeader='Notas'/>
                    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} style={{backgroundColor: selectedTheme.darkBg}}>
                        <MainContainerSignIn
                        contentContainer={
                            <>
                            <View>
                                {/* VIEW NOTES OLD */}
                                {notes.length === 0 ? (
                                <View style={{backgroundColor: selectedTheme.darkAccent, padding: 20, borderRadius: 25, flex: 1,}}>
                                    <View style={{marginBottom: 20, flex: 1,}}>
                                        <MediumText textValue="Aun no has creado ninguna nota" altStyle={{fontSize: 17, textAlign: 'center'}}/>
                                        <MediumText textValue="¡Vamos crea tu primera nota!" altStyle={{fontSize: 17, textAlign: 'center'}}/>
                                    </View>
                                    <MainButtonAccent
                                    onPress={() => navigation.navigate('AddNote')}
                                    buttonText="Crear nota"
                                    accentColorBg={selectedTheme.btnAccentBgColor}
                                    accentColorText={selectedTheme.btnAccentTxtColor}/>
                                </View>
                                ) : (
                                    notes.map((notes) => (
                                        <NotesHome
                                            priorityNote={notes.priority}
                                            titleNote={notes.titleNote}
                                            deadlineNote={notes.deadline}
                                            membersNote={notes.members}
                                            commentsNote={notes.comments}
                                            attachedFilesNote={notes.attachedFiles}
                                            onPressNote={() => {
                                                navigation.push('NoteDetails', { notes });
                                            }}
                                            keyBottonNote={notes.id}
                                            // keyRender={index}
                                        />
                                    ))
                                )}
                                


                                {/* VIEW NOTES SIMPLE NEW */}
                                {notes.length === 0 ? null : (
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 15, alignItems: 'flex-start'}}>
                                        {notes.map((notes) => (
                                            
                                            <NewSimpleNote 
                                                priorityNote={notes.priority}
                                                titleNote={notes.titleNote}
                                                descriptionNote={notes.descriptionNote}
                                                attachedFilesNote={notes.attachedFiles}
                                                onPressNote={() => {
                                                    navigation.push('NoteDetails', { notes });
                                                }}
                                            />
                                        ))}
                                    </View>
                                )}
                                
                                <Text style={{color: '#fff'}}>Total de miembros en todas las nota: {totalMembers}</Text>
                            </View>
                            </>
                        }
                        />
                    </ScrollView>


                    {/* BOTTOMSHEET */}
                    <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: zIndex}}>
                        <BottomSheetModalProvider>
                            <BottomSheetModal
                                ref={sheetRef}
                                snapPoints={snapPoint}
                                enablePanDownToClose={true}
                                // handleStyle={{height: 0}}
                                handleIndicatorStyle={{backgroundColor: selectedTheme.darkSecundary,}}
                                backgroundStyle={{backgroundColor: selectedTheme.darkAccent, borderRadius: 30, }}
                                backdropComponent={(props) => <CustomBackdrop {...props} close={() => {sheetRef.current?.close(); setZIndex(-999)}} />}
                                index={0}
                                onChange={handleOnChange}
                            >
                                <View style={{flex: 1, marginHorizontal: 20, marginTop: 10,}}>
                                    <Pressable onPress={() => {_closeNavigateBottomSheet();}}>
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
                    </View>
                    
                    {/* BOTTOMMENU */}
                    <BottomMenuHome onPressPlusBtn={() => {_openBottomSheet()}}/>
                    {/* <BottomMenuHome onPressPlusBtn={() => {navigation.navigate('AddNote')}}/> */}
                </>
            )}
        </>
    );
};

export default HomeNotes;

const styles = StyleSheet.create({});
