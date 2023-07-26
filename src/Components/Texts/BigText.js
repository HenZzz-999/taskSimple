import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'

import { ThemeContext } from '../../../ThemeContext';
import { themeDark } from '../Colors'

const BigText = ({textValue, altStyle}) => {

    const { selectedTheme } = useContext(ThemeContext);

    return (
        <Text style={[styles.bigTextStyle, altStyle, {color: selectedTheme.whiteColor,}]}>{textValue}</Text>
    )
}

export default BigText

const styles = StyleSheet.create({
    bigTextStyle: {
        fontFamily: 'Gilroy-Bold',
        fontSize: 32,
    }
})