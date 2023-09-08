import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useContext} from 'react'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native';

import BigText from '../Texts/BigText'

import { ThemeContext } from '../../../ThemeContext';


const TagHeaderSignOut = ({ tagTextValue }) => {

    const navigation = useNavigation();
    const { selectedTheme } = useContext(ThemeContext);

    return (
        <View style={styles.contentTagContainer}>
            <View style={styles.spacingWidthLeftRight}>
                <Pressable onPress={navigation.goBack}>
                    <Image style={{width: 30, height: 25, tintColor: selectedTheme.whiteColor }} contentFit="contain" source={require('../../../assets/Icons/go_back_icon.png')}/>
                </Pressable>
            </View>
            <View style={styles.spacingWidthMiddle}>
                <BigText textValue={tagTextValue} altStyle={styles.titleHeaderTag}/>
            </View>
            <View style={styles.spacingWidthLeftRight}>
                <Text></Text>
            </View>
        </View>
    )
}

export default TagHeaderSignOut

const styles = StyleSheet.create({
    contentTagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 45
    },
    spacingWidthLeftRight: {
        width: '15%'
    },
    spacingWidthMiddle: {
        width: '70%',
        textAlign: 'center'
    },
    titleHeaderTag: {
        textAlign: 'center',
        fontSize: 27
    }
})