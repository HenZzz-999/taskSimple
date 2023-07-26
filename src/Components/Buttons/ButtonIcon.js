import { StyleSheet, Text, View, Pressable, Animated } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { Image } from 'expo-image'

import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../../ThemeContext';

const ButtonIcon = ({iconButton, altStyle, altStyleContainer, onPress}) => {

    const navigation = useNavigation();

    const { selectedTheme } = useContext(ThemeContext);

    const scaleBgBtn = useRef(new Animated.Value(0)).current;

    const onPressIn = () => {
        Animated.timing(scaleBgBtn, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const onPressOut = () => {
        setTimeout(() => {
            Animated.timing(scaleBgBtn, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }, 200)
        // navigation.navigate('Settings')
    };

    const animatedScale = {
        transform: [{ scale: scaleBgBtn }],
    }

    return (
        <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={() => {onPressOut()}}>
            <Animated.View style={[{padding: 10, borderRadius: 100}, altStyleContainer]}>
                <Image source={iconButton} contentFit="contain" style={[{width: 17, height: 17, tintColor: selectedTheme.iconColor, zIndex: 100}, altStyle]}/>
                <Animated.View style={[{width: '100%', height: '100%', padding: 19, left: 0, top: 0, borderRadius: 100, backgroundColor: selectedTheme.btnIconPressBg, position: 'absolute',}, animatedScale]}/>
            </Animated.View>
        </Pressable>
    )
}

export default ButtonIcon

const styles = StyleSheet.create({})