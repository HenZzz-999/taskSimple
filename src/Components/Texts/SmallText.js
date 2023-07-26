import { View, Text, StyleSheet } from 'react-native'
import React, {useContext} from 'react'

import { ThemeContext } from '../../../ThemeContext';
import { themeDark } from '../Colors'

const SmallText = ({textValue, altStyle}) => {

    const { selectedTheme } = useContext(ThemeContext);

    return (
        <Text style={[styles.smallTextStyle, altStyle, {color: selectedTheme.whiteColor,}]}>{textValue}</Text>
    )
}

export default SmallText

const styles = StyleSheet.create({
    smallTextStyle: {
        fontFamily: 'Gilroy-Bold',
        fontSize: 10,
    }
})