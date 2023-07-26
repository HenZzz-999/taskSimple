import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useContext } from 'react'
import { Image } from 'expo-image'
import MediumText from '../Texts/MediumText'
import { ThemeContext } from '../../../ThemeContext';

import { useNavigation } from '@react-navigation/native';



const TagMenuHeaderSignIn = ({ titleMenuHeader }) => {

    const { selectedTheme } = useContext(ThemeContext);

    const navigation = useNavigation();

    const animatedButtonScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(animatedButtonScale, {
        toValue: 0.9,
        useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(animatedButtonScale, {
        toValue: 1,
        useNativeDriver: true,
        }).start();
    };

    const animatedScaleStyle = {
        transform: [{ scale: animatedButtonScale }],
    };

    return (
        <View style={[styles.contentHeaderMenu, {backgroundColor: selectedTheme.darkAccent}]}>
            <Pressable onPress={() => {navigation.openDrawer();}} onPressIn={onPressIn} onPressOut={() => {onPressOut()}}>
                <Animated.View style={animatedScaleStyle}>
                    <Image
                        source={require('../../../assets/Icons/menu_bars_icon.png')}
                        contentFit="contain"
                        style={{width: 25, height: 25, tintColor: selectedTheme.iconColor, marginRight: 25}}
                        />
                </Animated.View>
            </Pressable>
            <MediumText textValue={titleMenuHeader} altStyle={{fontSize: 20, fontFamily: 'Gilroy-Bold',}}/>
        </View>
    )
}

export default TagMenuHeaderSignIn

const styles = StyleSheet.create({
    contentHeaderMenu: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        // position: 'absolute',
        top: 0,
        // zIndex: 100
    },
})