import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react';

import { ThemeContext } from '../../../ThemeContext';
import { themeDark } from '../../Components/Colors'

const MainContainerViewsSignOut = ({contentContainer, altStyles}) => {

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
        paddingTop: 40,
        paddingBottom: 80,
        marginHorizontal: 20,
        flex: 1
    }
})

export default MainContainerViewsSignOut