import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import React, { useContext, useRef } from "react";
import MediumText from "../Texts/MediumText";
import { ThemeContext } from "../../../ThemeContext";
import { Image } from "expo-image";

import { Col, Row, Grid } from "react-native-easy-grid";

const NewSimpleNote = ({ priorityNote, titleNote, attachedFilesNote, onPressNote, descriptionNote }) => {
    
    const { selectedTheme } = useContext(ThemeContext);
    const animatedNoteScale = useRef(new Animated.Value(1)).current;

    let priorityNoteColor = selectedTheme.highPriority; // Valor predeterminado

    if (priorityNote === 'Alta') {
        priorityNoteColor = '#EB5769';
    } else if (priorityNote === 'Media') {
        priorityNoteColor = '#FFBD23';
    } else if (priorityNote === 'Baja') {
        priorityNoteColor = '#5DC983';
    }

    // NOTE SCALE EFFECT
    const onPressInNote = () => {
        Animated.spring(animatedNoteScale, {
        toValue: 0.969,
        useNativeDriver: true,
        }).start();
        
    };

    const onPressOutNote = () => {
        Animated.spring(animatedNoteScale, {
        toValue: 1,
        useNativeDriver: true,
        }).start();
    };

    const animatedScaleNoteStyle = {
        transform: [{ scale: animatedNoteScale }],
    };


    return (
        <Pressable
            onPress={onPressNote}
            onPressIn={onPressInNote}
            onPressOut={() => {onPressOutNote()}}
            style={{flexBasis: '48%',}}
        >
            <Animated.View style={[{backgroundColor: '#313131', paddingHorizontal: 12, paddingBottom: 12, paddingTop: 13, borderRadius: 18, rowGap: 13}, animatedScaleNoteStyle]}>
                <View style={{flexDirection: 'column', rowGap: 6}}>
                    <MediumText ellipsizeMode='tail' numberOfLines={1} textValue={titleNote} altStyle={{fontSize: 13}}/>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={{fontSize: 12, color: '#696969', fontFamily: 'Gilroy-SemiBold', lineHeight: 14}}>{descriptionNote}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={[styles.contentPriority, { backgroundColor: priorityNoteColor }]}>
                        <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 11, color: '#ffffff'}}>{priorityNote}</Text>
                    </View>
                    <View style={styles.bottomSubContainersFlex}>
                        <Image source={require('../../../assets/Icons/attachments_icon.png')} contentFit="contain" style={{width: 16, height: 16, marginRight: 7, tintColor: selectedTheme.accent}}/>
                        <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: selectedTheme.accent,}}>{attachedFilesNote}</Text>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
};

export default NewSimpleNote;

const styles = StyleSheet.create({
    contentPriority: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 100
    },
    bottomSubContainersFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
