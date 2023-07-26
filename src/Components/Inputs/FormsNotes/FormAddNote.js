import { StyleSheet, Text, View, TextInput, Pressable, Platform, Animated, useWindowDimensions, Alert, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef, useContext } from 'react'
import * as Yup from 'yup'
import { Formik, validateForm } from 'formik'
import MainButton from '../../Buttons/MainButton'

import { useNavigation } from '@react-navigation/native';


import { addDoc, collection, doc, limit, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../firebase'
import { ThemeContext } from '../../../../ThemeContext'

const uploadNoteSchema = Yup.object().shape({
    titleNote: Yup.string().required('El titulo es obligatorio').max(2200, 'Haz alcanzado el limite de caracteres').min(3, ''),
    descriptionNote: Yup.string().required('La descripcion es obligatoria').max(2200, 'Haz alcanzado el limite de caracteres').min(3, ''),
    // fechaLimiteNota: Yup.date().required('La fecha es obligatoria'),
})



const FormAddNote = () => {

    const { selectedTheme } = useContext(ThemeContext);

    const navigation = useNavigation();
    const [zIndex, setZIndex] = useState(-9999)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState([])
    
    const scalePopUp = useRef(new Animated.Value(0)).current;
    const colorBgPopUp = useRef(new Animated.Value(0)).current;
    
	const dimensions = useWindowDimensions();
    
    const scalePopUpStyle = {
        transform: [{ scale: scalePopUp }],
    };
    
    const colorBgPopUpStyle = {
        backgroundColor: colorBgPopUp.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']
        }),
    };

    const animationsPopUp = () => {
        Animated.spring(scalePopUp, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        Animated.timing(colorBgPopUp, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
        setZIndex(9999)
    }
    
    
    // FIREBASE
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
        getUserName()
        // console.log(currentLoggedInUser.userName + "" + currentLoggedInUser.lastName)
    }, [])

    const uploadNoteToFirebase = (titleNote, descriptionNote) => {
        const userDocRef = doc(collection(FIRESTORE_DB, 'users'), FIREBASE_AUTH.currentUser.email);
        const notesCollectionRef = collection(userDocRef, 'notes');

        const dataNote = {
            titleNote: titleNote,
            descriptionNote: descriptionNote,
            createdby: currentLoggedInUser.userName + " " + currentLoggedInUser.lastName,
            createdAt: serverTimestamp(),
            members: 1,
            comments: 0,
            attachedFiles: 0,
            priority: selectedPriorityOption,
            deadline: '2 Jun'
        };
        const addNote = addDoc(notesCollectionRef, dataNote);
    };


    const [selectedPriorityOption, setSelectedPriorityOption] = useState('Media');
    const positionIndicator = useRef(new Animated.Value(1)).current;
    
    const handleOptionChange = (option, index) => {
        setSelectedPriorityOption(option);
        // console.log(option)
    };

    if (selectedPriorityOption === 'Alta'){
        Animated.spring(positionIndicator, {
            toValue: dimensions.width - dimensions.width,
            useNativeDriver: true,
        }).start();
    } else if (selectedPriorityOption === 'Media') {
        Animated.spring(positionIndicator, {
            toValue: dimensions.width - 256,
            useNativeDriver: true,
        }).start();
    } else if (selectedPriorityOption === 'Baja') {
        Animated.spring(positionIndicator, {
            toValue: dimensions.width - 152,
            useNativeDriver: true,
        }).start();
    }

    const animatedIndicator = {
        transform: [{ translateX: positionIndicator }],
    };



    return (
        <Formik
        initialValues={{titleNote: '', descriptionNote: '',}}
        onSubmit={(values) => {
            animationsPopUp();
            uploadNoteToFirebase(values.titleNote, values.descriptionNote)
            // console.log(values);
            console.log('Tu nota se a creado con exito 🎉');
            setTimeout(() => {
                navigation.goBack()
            }, 2000)
        }}
        validationSchema={uploadNoteSchema}
        validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) =>
                <>
                    <View style={{justifyContent: 'space-between', flex: 1,}}>
                        <View style={{}}>
                            <View style={{marginBottom: 20}}>
                                <Text style={{
                                        color: selectedTheme.whiteColor,
                                        fontFamily: 'Gilroy-Bold',
                                        fontSize: 14,
                                        marginBottom: 10
                                        }}>Titulo {errors.titleNote && (
                                        <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: '#eb5769'}}>
                                            *{errors.titleNote}
                                        </Text>)}
                                        </Text>
                                <TextInput
                                        style={[{
                                            backgroundColor: selectedTheme.darkAccent,
                                            borderRadius: 15,
                                            paddingVertical: 12,
                                            paddingHorizontal: 15,
                                            color: selectedTheme.whiteColor,
                                            fontFamily: 'Gilroy-SemiBold',
                                            fontSize: 15,
                                            borderColor: selectedTheme.darkAccent,
                                            borderWidth: 1.8
                                            }, ]} // errors.titleNote && styles.textInputsError
                                        placeholder='Titulo de la nota'
                                        placeholderTextColor={selectedTheme.darkSecundary}
                                        onChangeText={handleChange('titleNote')}
                                        onBlur={handleBlur('titleNote')}
                                        value={values.titleNote}
                                    />
                            </View>
                            <View style={{marginBottom: 20}}>
                                <Text style={{
                                        color: selectedTheme.whiteColor,
                                        fontFamily: 'Gilroy-Bold',
                                        fontSize: 14,
                                        marginBottom: 10
                                        }}>Descripcion {errors.descriptionNote && (
                                        <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: '#eb5769'}}>
                                            *{errors.descriptionNote}
                                        </Text>)}</Text>
                                <TextInput
                                        style={[{
                                            backgroundColor: selectedTheme.darkAccent,
                                            marginBottom: 10,
                                            height: 150,
                                            textAlignVertical: 'top',
                                            borderRadius: 15,
                                            paddingVertical: 12,
                                            paddingHorizontal: 15,
                                            color: selectedTheme.whiteColor,
                                            fontFamily: 'Gilroy-SemiBold',
                                            fontSize: 15,
                                            borderColor: selectedTheme.darkAccent,
                                            borderWidth: 1.8,
                                            lineHeight: 20
                                            }]}
                                        multiline
                                        numberOfLines={5}
                                        placeholder='Ingresa la descripción de la nota'
                                        placeholderTextColor={selectedTheme.darkSecundary}
                                        onChangeText={handleChange('descriptionNote')}
                                        onBlur={handleBlur('descriptionNote')}
                                        value={values.descriptionNote}
                                    />
                            </View>
                            <View>
                                <Text style={{
                                    color: selectedTheme.whiteColor,
                                    fontFamily: 'Gilroy-Bold',
                                    fontSize: 14,
                                    marginBottom: 10
                                    }}>Prioridad</Text>
                                <View style={{backgroundColor: selectedTheme.darkAccent, borderRadius: 15, paddingVertical: 7, paddingHorizontal: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                                    <View style={styles.containerOptions}>
                                        <Pressable
                                            style={[
                                                styles.optionButton,
                                                selectedPriorityOption === 'Alta'
                                            ]}
                                            onPress={() => handleOptionChange('Alta')}
                                        >
                                            <Text
                                                style={
                                                    [selectedPriorityOption === 'Alta' ?
                                                    {color: '#1b1b1b', fontSize: 16, textAlign: 'center', fontFamily: 'Gilroy-SemiBold'} :
                                                    {color: selectedTheme.disableSelectionColor, fontSize: 16, textAlign: 'center', fontFamily: 'Gilroy-SemiBold'}]}>Alta</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[
                                                styles.optionButton,
                                                selectedPriorityOption === 'Media'
                                            ]}
                                            onPress={() => handleOptionChange('Media')}
                                        >
                                            <Text
                                                style={
                                                    [selectedPriorityOption === 'Media' ?
                                                    {color: '#1b1b1b', fontSize: 16, textAlign: 'center', fontFamily: 'Gilroy-SemiBold'} :
                                                    {color: selectedTheme.disableSelectionColor, fontSize: 16, textAlign: 'center', fontFamily: 'Gilroy-SemiBold'}]}>Media</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[
                                                styles.optionButton,
                                                selectedPriorityOption === 'Baja'
                                            ]}
                                            onPress={() => handleOptionChange('Baja')}
                                        >
                                            <Text
                                                style={
                                                    [selectedPriorityOption === 'Baja' ?
                                                    {color: '#1b1b1b', fontSize: 16, textAlign: 'center', fontFamily: 'Gilroy-SemiBold'} :
                                                    {color: selectedTheme.disableSelectionColor, fontSize: 16, textAlign: 'center', fontFamily: 'Gilroy-SemiBold'}]}>Baja</Text>
                                        </Pressable>
                                    </View>
                                    <Animated.View style={[{borderRadius: 14, paddingVertical: 23, backgroundColor: '#A7C7FA', position: 'absolute', width: '32%', left: 5, zIndex: 1}, animatedIndicator]}/>
                                </View>
                            </View>
                        </View>
                        <View>
                            <MainButton
                                buttonText='Crear nota'
                                onPress={handleSubmit}
                                disabled={!isValid}
                                disableBtnStyle={[!isValid && {backgroundColor: selectedTheme.btnIconPressBg}]}
                                disableTextStyle={[!isValid && styles.textBtnSubmitDisable]}
                                />
                        </View>
                    </View>
                    <Animated.View style={[{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: zIndex, }, colorBgPopUpStyle]}>
                        <Animated.View style={[{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: zIndex, }, scalePopUpStyle]}>
                            <View style={{backgroundColor: selectedTheme.darkAccent, width: dimensions.width / 1.2, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 20, alignItems: 'center',}}>
								<Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 17, color: selectedTheme.whiteColor}}>Se a creado tu nota con exito 🎉🥳</Text>
                            </View>
                        </Animated.View>
                    </Animated.View>
                </>
            }
        </Formik>
    )
}

export default FormAddNote

const styles = StyleSheet.create({
    btnSubmitDisable: {
        backgroundColor: '#575759',
    },
    textBtnSubmitDisable: {
        color: '#8d8d8d'
    },
    textInputsError: {
        backgroundColor: 'rgba(235, 87, 105, 0.15)',
        borderColor: '#eb5769'
    },
    containerOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 5,
    },
    optionButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 5,
        // zIndex: 5,
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Gilroy-SemiBold'
    },
    optionTextSelected: {
        color: '#1b1b1b',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Gilroy-SemiBold'
    },
    selectedPriorityOption: {
        backgroundColor: '#A7C7FA',
    },
})