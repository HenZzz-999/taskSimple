import React, { useState, useRef, useEffect, useContext } from 'react';
import { TextInput, Animated, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import colors from '../Colors'

import { ThemeContext } from '../../../ThemeContext';

const StyledTextInput = ({
    validatorColorChange,
    labelText,
    extraStylesContainerValue,
    iconTextInput,
    secureTextEntry,
    autoCapitalize,
    iconState,
    keyboardType,
    autoFocus,
    onChangeText,
    onBlur,
    values }) => {


    // THEME CHANGE
    const { selectedTheme } = useContext(ThemeContext);


    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [borderInputColor, setBorderInputColor] = useState(selectedTheme.darkSecundary)
    const [colorLabelInput, setColorLabelInput] = useState(selectedTheme.darkSecundary)
    const [colorIconInput, setColorIconInput] = useState(selectedTheme.darkSecundary)
    const iconStateVisibile = iconState
    const [paddingInputState, setPaddingInputState] = useState({paddingLeft: 60})
    const [labelPosInputIconState, setLabelPosInputIconState] = useState({left: 55})
    const animatedValue = useState(new Animated.Value(inputValue ? 1 : 0))[0];
    const textInputRef = useRef(null);

    const [secureTextEntryState, setSecureTextEntryState] = useState(secureTextEntry)

    
    const [iconVisiblePass, setIconVisiblePass] = useState(require('../../../assets/Icons/visible_password_icon.png'))


    const handlePressIconEye = () => {
        setIconVisiblePass(prevIcon =>
        prevIcon === require('../../../assets/Icons/visible_password_icon.png')
            ? require('../../../assets/Icons/invisible_password_icon.png')
            : require('../../../assets/Icons/visible_password_icon.png')
        );
        setSecureTextEntryState(setState =>
            setState === true
            ? false
            : true
        )
    };

    useEffect(() => {
        if (iconStateVisibile === 'false') {
            setPaddingInputState({ paddingLeft: 40 });
            setLabelPosInputIconState({ left: 30 });
        } else {
            setPaddingInputState({ paddingLeft: 60 });
            setLabelPosInputIconState({ left: 55 });
        }
    }, [iconStateVisibile]);

    // useEffect(() => {
    //     if (secureTextEntryState === true) {
    //         console.log('secure entry es true')
    //     } else {
    //         console.log('secure entry es false')
    //     }
    // }, [secureTextEntryState])


    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
        }).start();
        setBorderInputColor(selectedTheme.accent)
        setColorLabelInput(selectedTheme.accent)
        setColorIconInput(selectedTheme.accent)
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(animatedValue, {
            toValue: inputValue ? 1 : 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
        setBorderInputColor(selectedTheme.darkSecundary)
        setColorLabelInput(selectedTheme.darkSecundary)
        setColorIconInput(selectedTheme.darkSecundary)
    };


    // REMPLASO DEL handleTextChange
    useEffect(() => {
        if (values.length >= 1){
            setInputValue(values);
            Animated.timing(animatedValue, {
                toValue: values ? 1 : 1,
                duration: 100,
                useNativeDriver: false,
            }).start();
        } else {
            setInputValue('');
        }
    })

    // const handleTextChange = () => {
    //     setInputValue(values);
    //     Animated.timing(animatedValue, {
    //         toValue: values ? 1 : 1,
    //         duration: 100,
    //         useNativeDriver: false,
    //     }).start();
        
    //     text ? setBorderInputColor('#A7C7FA') : setBorderInputColor('#696969')
    //     text ? setColorIconInput('#ffffff') : setColorIconInput('#696969')
    //     text ? setColorLabelInput('#A7C7FA') : setColorLabelInput('#696969')
    // };

    const labelStyle = {
        backgroundColor: selectedTheme.darkBg,
        fontFamily: 'Gilroy-Bold',
        paddingHorizontal: 7,
        top: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [20, -8],
        }),
        left: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20],
        }),
        fontSize: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 14],
        }),
        color: colorLabelInput,
    };

    const handlePressLabel = () => {
        setIsFocused(true);
        textInputRef.current.focus();
    };


    return (
        <View style={[styles.container, extraStylesContainerValue]}>
        <Image
            contentFit="contain"
            source={iconTextInput}
            style={{ width: 25, height: 25, tintColor: colorIconInput, position: 'absolute', top: 18, left: 20 }}
        />
        <TextInput
            style={[secureTextEntry === true ? styles.textInputPassword : styles.textInput, {borderColor: borderInputColor, color: selectedTheme.whiteColor,}, paddingInputState, validatorColorChange ]}
            onFocus={handleFocus}
            ref={textInputRef}
            autoCapitalize = {autoCapitalize}
            secureTextEntry = {secureTextEntryState}
            keyboardType={keyboardType}
            onBlur={() => {handleBlur(); onBlur}}
            onChangeText={onChangeText}
            autoFocus={autoFocus}
            value={values}
        />
        {secureTextEntry === true ? (
            <Pressable onPress={handlePressIconEye} style={{position: 'absolute', top: 19, right: 20, backgroundColor: selectedTheme.darkBg,}}>
                <Image contentFit="contain" source={iconVisiblePass} style={{width: 25, height: 25}}/>
            </Pressable>
        ) : (null)}
        <TouchableOpacity activeOpacity={1} style={[{position: 'absolute', left: 55 }, labelPosInputIconState]} onPress={handlePressLabel}>
            <Animated.Text style={labelStyle}>{labelText}</Animated.Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
    },
    textInput: {
        borderWidth: 3,
        borderRadius: 18,
        paddingVertical: 14,
        paddingLeft: 60,
        paddingRight: 20,
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 16
    },
    textInputPassword: {
        borderWidth: 3,
        borderRadius: 18,
        paddingVertical: 14,
        paddingLeft: 60,
        paddingRight: 50,
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 16
    },
    visibleLabel: {
        opacity: 1,
    },
});

export default StyledTextInput;
