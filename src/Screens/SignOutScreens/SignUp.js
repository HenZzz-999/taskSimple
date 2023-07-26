import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import { StatusBar } from 'expo-status-bar';

import MainContainerSignOut from '../../../src/Components/Containers/MainContainerViewsSignOut'
import MediumText from '../../Components/Texts/MediumText'
import StyledTextInput from '../../Components/Inputs/StyledTextInput'
import MainButton from '../../Components/Buttons/MainButton'
import TagHeaderSignOut from '../../Components/TagHeaderViews/TagHeaderSignOut'

import * as Yup from 'yup'
import { Formik, validateForm } from 'formik'

import { ThemeContext } from '../../../ThemeContext';

import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';


const FormSignUpSchema = Yup.object().shape({
    nameUser: Yup.string().required('').min(3, '')
	.test('no-spaces', 'No se permiten espacios', value => {
		if (value) {
			return !/\s/.test(value);
		}
		return true;
	}),
    lastNameUser: Yup.string().required('').min(3, '')
	.test('no-spaces', 'No se permiten espacios', value => {
		if (value) {
			return !/\s/.test(value);
		}
		return true;
	}),
	email: Yup.string().email().required('Es requerido el email'),
	password: Yup.string()
        .required()
        .min(6, 'Tu contraseña tiene que tener mas de 8 caracteres')
})

const SignUp = ({navigation}) => {

	const { selectedTheme } = useContext(ThemeContext);

	const signUp = async (nameUser, lastNameUser, email, password) => {
		try {
			const authUser = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
			console.log('La cuenta se a creado perfectamente!!')

			// const userRef = doc(collection(FIRESTORE_DB, 'users'), authUser.user.email);

			// const userData = {
			// 	owner_uid: authUser.user.uid,
			// 	name: nameUser,
			// 	lastName: lastNameUser,
			// 	email: authUser.user.email
			// };

			await setDoc(doc(collection(FIRESTORE_DB, 'users'), authUser.user.email), {
				owner_uid: authUser.user.uid,
				name: nameUser,
				lastName: lastNameUser,
				email: authUser.user.email
			});

		} catch (error) {
			Alert.alert(error.message);
		}
	}

	return (
		<>
			<StatusBar style={selectedTheme.statusBarStyle} translucent = {true} hidden = {false}/>
				<MainContainerSignOut altStyles={{paddingTop: 60,}} contentContainer={
				<>
				<TagHeaderSignOut tagTextValue='Crear Cuenta'/>
				<View>
					<Formik
						initialValues={{ nameUser: '', lastNameUser: '', email: '', password: '' }}
						onSubmit={values => {
							signUp(values.nameUser, values.lastNameUser, values.email, values.password)
							console.log(values)
						}}
						validationSchema={FormSignUpSchema}
						validateOnMount={true}
					>
						{({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) =>
							<>
								<View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
									<StyledTextInput
										labelText='Nombre'
										iconTextInput={require('../../../assets/Icons/name_credential_icon.png')}
										extraStylesContainerValue={{width: '47%'}}
										autoCapitalize="sentences"
										autoFocus={true}
										onChangeText={handleChange('nameUser')}
										onBlur={handleBlur('nameUser')}
										values={values.nameUser}
									/>
									<StyledTextInput
										labelText='Apellido'
										extraStylesContainerValue={{width: '47%'}}
										autoCapitalize="sentences"
										iconState = 'false'
										onChangeText={handleChange('lastNameUser')}
										onBlur={handleBlur('lastNameUser')}
										values={values.lastNameUser}
									/>
								</View>
								{errors.nameUser && (
									<View style={{marginTop: 5}}>
										<Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: '#FFBD23'}}>
											{errors.nameUser}
										</Text>
									</View>) || errors.lastNameUser && (
									<View style={{marginTop: 5}}>
										<Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: '#FFBD23'}}>
											{errors.lastNameUser}
										</Text>
									</View>)}
								<StyledTextInput
									labelText='Email'
									iconTextInput={require('../../../assets/Icons/email_icon.png')}
									extraStylesContainerValue={{marginTop: 25,}}
									autoCapitalize="none"
									keyboardType='email-address'
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									values={values.email}
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
									<Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.whiteColor}}>¿Ya tienes una cuenta? </Text>
									<Pressable onPress={() => navigation.navigate('SignIn')}>
										<Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 15, color: selectedTheme.accent}}>
											Inicia Sesion
										</Text>
									</Pressable>
								</View>
							</>
						}
					</Formik>
				</View>
				</>
			}/>
			</>
	)
}

export default SignUp

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