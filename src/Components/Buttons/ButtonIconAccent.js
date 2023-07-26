import React, { useRef, useContext } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

import { themeDark } from '../Colors';

import { ThemeContext } from '../../../ThemeContext';
import { Image } from 'expo-image';

const ButtonIconAccent = ({ onPress, buttonIcon, accentColor, accentIconColor, altStyle }) => {

    // COLOR THEME CHANGE
    const { selectedTheme } = useContext(ThemeContext);

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
        <Pressable
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={() => {onPressOut()}}
            style={[styles.btnMainStyle]}
        >
        <Animated.View style={[styles.btnGetStarted, animatedScaleStyle, {backgroundColor: accentColor,} ]}>
            <Image
                style={{width: 20, height: 20, tintColor: accentIconColor}}
                contentFit="contain"
                source={buttonIcon}/>
        </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btnMainStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    btnGetStarted: {
        paddingVertical: 17,
        borderRadius: 20,
        padding: 18
    },
    textBtngetStarted: {
        textAlign: 'center',
        fontFamily: 'Gilroy-Bold',
        fontSize: 16,
        color: '#1b1b1b'
    },
});

export default ButtonIconAccent;
