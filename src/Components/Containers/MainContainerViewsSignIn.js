import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react';

import { ThemeContext } from '../../../ThemeContext';
import { themeDark } from '../Colors'

const MainContainerViewsSignIn = ({contentContainer, altStyles}) => {

    const { selectedTheme } = useContext(ThemeContext);
    return (
            <View style={[styles.mainContainerStyle, {backgroundColor: selectedTheme.darkBg,}]}>
                <View style={[styles.mainContainerStyleContent, altStyles]}>{contentContainer}</View>
            </View>
    )
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
    },
    mainContainerStyleContent: {
        paddingTop: 20,
        paddingBottom: 80,
        marginHorizontal: 20,
    },
})

export default MainContainerViewsSignIn