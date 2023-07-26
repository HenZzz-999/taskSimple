import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'

import { ThemeContext } from '../../../ThemeContext';
import { themeDark } from '../Colors'

const MediumText = ({textValue, altStyle, ellipsizeMode, numberOfLines}) => {

    const { selectedTheme } = useContext(ThemeContext);

    return (
        <Text ellipsizeMode={ellipsizeMode} numberOfLines={numberOfLines} style={[styles.mediumTextStyle, altStyle, {color: selectedTheme.whiteColor,}]}>{textValue}</Text>
    )
}

export default MediumText

const styles = StyleSheet.create({
    mediumTextStyle: {
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 15,
    }
})