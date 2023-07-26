import { Pressable, StyleSheet, Text, View, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';

import MainContainerSignOut from '../../../src/Components/Containers/MainContainerViewsSignOut'
import MediumText from '../../Components/Texts/MediumText'
import StyledTextInput from '../../Components/Inputs/StyledTextInput'
import MainButton from '../../Components/Buttons/MainButton'
import TagHeaderSignOut from '../../Components/TagHeaderViews/TagHeaderSignOut'

import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../../ThemeContext';

import * as Yup from 'yup'
import { Formik, validateForm } from 'formik'
import Validator from 'email-validator';


import { FIREBASE_AUTH, FIRESTORE_DB, firebase } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('Es requerido el email'),
    password: Yup.string()
        .required()
        .min(6, 'Tu contraseña tiene que tener mas de 8 caracteres')
})


const SignIn = ({navigation}) => {

    // const navigation = useNavigation();


    // const pruebaFirebase = () => {
    //     const doc = addDoc(collection(FIRESTORE_DB, 'todos'), {title: 'aña', done: false});
    //     console.log('termino el proceso', doc)
    // }

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            console.log('inicio de sesion perfecto!!')
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const { selectedTheme } = useContext(ThemeContext);

    return (
        <>
        <StatusBar style={selectedTheme.statusBarStyle} translucent = {true} hidden = {false}/>
            <MainContainerSignOut altStyles={{paddingTop: 60,}} contentContainer={
            <>
            <TagHeaderSignOut tagTextValue='Iniciar Sesion'/>
            <View style={{flex: 1}}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        signIn(values.email, values.password)
                        console.log(values)
                    }}
                    validationSchema={LoginFormSchema}
                    validateOnMount={true}
                >
                    {({ handleBlur, handleChange, handleSubmit, values, isValid }) =>
                        <>
                            <StyledTextInput
                                labelText='Email'
                                iconTextInput={require('../../../assets/Icons/email_icon.png')}
                                autoCapitalize="none"
                                keyboardType='email-address'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                values={values.email}
                                // validatorColorChange={{backgroundColor: values.email.length < 1 || Validator.validate(values.email) ? 'rgba(0, 0, 0, 0)' : '#000000' }}
                            />
                            <StyledTextInput
                                labelText='Contraseña'
                                iconTextInput={require('../../../assets/Icons/password_icon.png')}
                                extraStylesContainerValue={{marginTop: 25, marginBottom: 30}}
                                secureTextEntry = {true}
                                autoCapitalize="none"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                values={values.password}
                            />
                            <MainButton
                                buttonText='Continuar'
                                onPress={handleSubmit}
                                disabled={!isValid}
                                disableBtnStyle={[!isValid && {backgroundColor: selectedTheme.btnIconPressBg}]}
                                disableTextStyle={[!isValid && styles.textBtnSubmitDisable]}
                                />
                            <View style={styles.signInBox}>
                                <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.whiteColor}}>¿No tienes una cuenta? </Text>
                                <Pressable onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.accent}}>
                                        Registrate!
                                    </Text>
                                </Pressable>
                            </View>
                        </>
                    }
                </Formik>
                {/* <MainButton
                    buttonText='Añadir DB'
                    onPress={() => pruebaFirebase()}
                /> */}
            </View>
            </>
        }/>
        </>

    )
}

export default SignIn

const styles = StyleSheet.create({
    signInBox: {
        flexDirection: 'row',
        alignItems: 'center',
		justifyContent: 'center',
		marginTop: 5
    },
    btnSubmitDisable: {
        backgroundColor: '#535353',
    },
    textBtnSubmitDisable: {
        color: '#8d8d8d'
    },
})