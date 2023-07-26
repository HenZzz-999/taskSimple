import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useContext} from 'react'

import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../../../ThemeContext';
import TagHeaderAddNote from '../../Components/TagHeaderViews/TagHeaderAddNote'
import MainContainerViewsSignOut from '../../Components/Containers/MainContainerViewsSignOut';
import FormUpdateNote from '../../Components/Inputs/FormsNotes/FormUpdateNote';


const UpdateNote = ({ route }) => {

    const { selectedTheme } = useContext(ThemeContext);
    const { notes } = route.params;

    return (
        <>
            <StatusBar style={selectedTheme.statusBarStyle} backgroundColor={selectedTheme.darkBg} translucent = {false} hidden = {false}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 1}}>
                <MainContainerViewsSignOut altStyles={{paddingBottom: 10, flex: 1, marginHorizontal: 0, paddingHorizontal: 20,}} contentContainer={
                    <>
                        <TagHeaderAddNote tagTextValue='Editar Nota'/>
                        <FormUpdateNote noteFields={notes}/>
                    </>
                }/>
            </ScrollView>
        </>
    )
}

export default UpdateNote

const styles = StyleSheet.create({})