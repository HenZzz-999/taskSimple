import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'expo-image'
import { ThemeContext } from '../../../ThemeContext';
import { useNavigation } from '@react-navigation/native';



const TagHeaderNoteDetails = ({ tagTextValue, onPressEdit }) => {

    const navigation = useNavigation();
    const { selectedTheme } = useContext(ThemeContext);

    return (
        <View style={styles.contentTagContainer}>
            <View style={styles.spacingWidthLeftRight}>
                <Pressable onPress={navigation.goBack}>
                    <Image style={{width: 30, height: 25, tintColor: selectedTheme.whiteColor }} contentFit="contain" source={require('../../../assets/Icons/go_back_icon.png')}/>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20,}}>
                <Pressable onPress={() => {}}>
                    <Image
                        style={{width: 25, height: 20, tintColor: selectedTheme.accent}}
                        contentFit="contain"
                        source={require('../../../assets/Icons/share_icon.png')}/>
                </Pressable>
                <Pressable onPress={onPressEdit}>
                    <Image
                        style={{width: 25, height: 20, tintColor: selectedTheme.accent }}
                        contentFit="contain"
                        source={require('../../../assets/Icons/edit_note_icon.png')}/>
                </Pressable>
            </View>
        </View>
    )
}

export default TagHeaderNoteDetails

const styles = StyleSheet.create({
    contentTagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 35,
        paddingHorizontal: 20,
    },
    titleHeaderTag: {
        textAlign: 'center',
        fontSize: 21
    }
})