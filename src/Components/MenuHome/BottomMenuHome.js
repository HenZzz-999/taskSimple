import { StyleSheet, Text, View, Pressable, Animated } from 'react-native'
import React, { useContext, useRef } from 'react'
import { Image } from 'expo-image'

import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../../ThemeContext';
import ButtonIcon from '../Buttons/ButtonIcon';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase';


const handleSignout = () => {
    signOut(FIREBASE_AUTH).then(console.log('Sign Out'))
}


const BottomMenuHome = ({ onPressPlusBtn }) => {

    // COLOR THEME CHANGE
    const { selectedTheme } = useContext(ThemeContext);

    const navigation = useNavigation();

    const animatedBtnScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(animatedBtnScale, {
        toValue: 0.9,
        useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(animatedBtnScale, {
        toValue: 1,
        useNativeDriver: true,
        }).start();
    };

    const animatedScaleStyle = {
        transform: [{ scale: animatedBtnScale }],
    };

    return (
        <View style={[styles.containerMenuBottom, {backgroundColor: selectedTheme.darkAccent,}]}>
            <View style={styles.iconsOptionsStyle}>
                <ButtonIcon iconButton={require('../../../assets/Icons/sortable_icon.png')} altStyleContainer={{marginRight: 10}}/>
                <ButtonIcon onPress={() => {}} iconButton={require('../../../assets/Icons/more_options_icon.png')} altStyle={{width: 17, height: 17}}/>
            </View>
            <View>
                <Pressable onPress={onPressPlusBtn} onPressIn={onPressIn} onPressOut={() => {onPressOut()}}>
                    <Animated.View style={[{padding: 18, backgroundColor: selectedTheme.bgAccent, borderRadius: 15}, animatedScaleStyle]}>
                        <Image
                            source={require('../../../assets/Icons/add_note_icon.png')}
                            contentFit="contain"
                            style={{width: 17, height: 17, tintColor: selectedTheme.accentIcon}}/>
                    </Animated.View>
                </Pressable>
            </View>
        </View>
    )
}

export default BottomMenuHome

const styles = StyleSheet.create({
    containerMenuBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 75,
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 100
    },
    iconsOptionsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 60
    }
})