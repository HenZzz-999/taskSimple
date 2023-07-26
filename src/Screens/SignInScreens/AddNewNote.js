import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React, {useContext} from 'react'

import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../../../ThemeContext';
import TagHeaderAddNote from '../../Components/TagHeaderViews/TagHeaderAddNote'
import MainContainerViewsSignOut from '../../Components/Containers/MainContainerViewsSignOut';
import FormAddNote from '../../Components/Inputs/FormsNotes/FormAddNote';

const AddNewNote = () => {

    const { selectedTheme } = useContext(ThemeContext);

    return (
        <>
            <StatusBar style={selectedTheme.statusBarStyle} backgroundColor={selectedTheme.darkBg} translucent = {false} hidden = {false}/>
            {/* <SafeAreaView> */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 1}}>
                    <MainContainerViewsSignOut altStyles={{paddingBottom: 10, flex: 1, marginHorizontal: 0, paddingHorizontal: 20,}} contentContainer={
                        <>
                            <TagHeaderAddNote tagTextValue='Añadir Nota'/>
                            <FormAddNote />
                        </>
                    }/>
                </ScrollView>
            {/* </SafeAreaView> */}
        </>
    )
}

export default AddNewNote

const styles = StyleSheet.create({})