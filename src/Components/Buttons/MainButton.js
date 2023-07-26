import React, { useRef, useContext } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

import { themeDark } from '../Colors';

import { ThemeContext } from '../../../ThemeContext';

const MainButton = ({ onPress, buttonText, transitionWelcomeScreen, disabled, disableBtnStyle, disableTextStyle, altStyle }) => {

    // COLOR THEME CHANGE
    const { selectedTheme } = useContext(ThemeContext);

    const animatedButtonScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(animatedButtonScale, {
        toValue: 0.95,
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
            style={[styles.btnMainStyle, altStyle]}
            disabled={disabled}
        >
        <Animated.View style={[styles.btnGetStarted, animatedScaleStyle, disableBtnStyle]}>
            <Text style={[styles.textBtngetStarted, disableTextStyle]}>{buttonText}</Text>
        </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btnMainStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    btnGetStarted: {
        paddingVertical: 17,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#A7C7FA'
    },
    textBtngetStarted: {
        textAlign: 'center',
        fontFamily: 'Gilroy-Bold',
        fontSize: 16,
        color: '#1b1b1b'
    },
});

export default MainButton;
