import React, { useRef, useState, useContext } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { themeDark } from '../Colors'
import MediumText from '../Texts/MediumText'
import SmallText from '../Texts/SmallText'
import { Image } from 'expo-image'

import { ThemeContext } from '../../../ThemeContext';


const NotesHome = ({onPressNote, priorityNote, titleNote, deadlineNote, membersNote, commentsNote, attachedFilesNote, keyRender, keyBottonNote}) => {

    const animatedNoteScale = useRef(new Animated.Value(1)).current;
    const animatedShareBtnScale = useRef(new Animated.Value(1)).current;

    // COLOR THEME CHANGE
    const { selectedTheme } = useContext(ThemeContext);

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

    // BTN SHARE EFFECT
    const onPressInShareBtn = () => {
        Animated.spring(animatedShareBtnScale, {
        toValue: 0.93,
        useNativeDriver: true,
        }).start();
        console.log('presionaste el compartir')
    };

    const onPressOutShareBtn = () => {
        Animated.spring(animatedShareBtnScale, {
        toValue: 1,
        useNativeDriver: true,
        }).start();
    };

    const animatedScaleShareBtnStyle = {
        transform: [{ scale: animatedShareBtnScale }],
    };

    return (
        <Pressable
            onPress={onPressNote}
            onPressIn={onPressInNote}
            onPressOut={() => {onPressOutNote()}}
            key={keyBottonNote}
        >
            <Animated.View style={[styles.containerNote, animatedScaleNoteStyle, {backgroundColor: selectedTheme.darkAccent}]}>
                <View style={styles.noteHeaderContent}>
                    <View style={[styles.contentPriority, { backgroundColor: priorityNoteColor }]}>
                        <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: '#ffffff'}}>{priorityNote}</Text>
                    </View>
                    <Pressable onPressIn={onPressInShareBtn} onPressOut={() => {onPressOutShareBtn()}}>
                        <Animated.View style={[{backgroundColor: selectedTheme.btnShareAccent, padding: 12, borderRadius: 100}, animatedScaleShareBtnStyle]}>
                            <Image source={require('../../../assets/Icons/share_icon.png')} contentFit="contain" style={{width: 16, height: 16, tintColor: selectedTheme.iconColor}}/>
                        </Animated.View>
                    </Pressable>
                </View>
                <View style={styles.noteMeanContent}>
                    <View style={styles.contentNoteTitle}>
                        <MediumText ellipsizeMode='tail' numberOfLines={2} textValue={titleNote} altStyle={{fontSize: 20, lineHeight: 25}}/>
                    </View>
                    <View style={styles.contentDeadlineNote}>
                        <Image source={require('../../../assets/Icons/calendar_icon.png')} contentFit="contain" style={{width: 15, height: 15, marginRight: 7, tintColor: selectedTheme.calendarNoteAccent}}/>
                        <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: selectedTheme.calendarNoteAccent,}}>{deadlineNote}</Text>
                    </View>
                </View>
                <View style={styles.noteBottomContent}>
                    <View style={styles.bottomContainersFlex}>
                        <Image source={require('../../../assets/Icons/members_icon.png')} contentFit="contain" style={{width: 16, height: 16, marginRight: 7, tintColor: selectedTheme.greyAccentComponents}}/>
                        <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: selectedTheme.greyAccentComponents,}}>{membersNote}</Text>
                    </View>
                    <View style={styles.bottomContainersFlex}>
                        <View style={[styles.bottomSubContainersFlex, {marginRight: 30}]}>
                            <Image source={require('../../../assets/Icons/comments_icon.png')} contentFit="contain" style={{width: 16, height: 16, marginRight: 7, tintColor: selectedTheme.accent}}/>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: selectedTheme.accent,}}>{commentsNote}</Text>
                        </View>
                        <View style={styles.bottomSubContainersFlex}>
                            <Image source={require('../../../assets/Icons/attachments_icon.png')} contentFit="contain" style={{width: 16, height: 16, marginRight: 7, tintColor: selectedTheme.accent}}/>
                            <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 13, color: selectedTheme.accent,}}>{attachedFilesNote}</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    )
}

export default NotesHome

const styles = StyleSheet.create({
    containerNote: {
        padding: 17,
        borderRadius: 25,
        width: '100%',
        marginBottom: 20
    },
    noteHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentPriority: {
        paddingHorizontal: 32,
        paddingVertical: 11,
        borderRadius: 100
    },
    noteMeanContent: {
        marginTop: 15,
        marginBottom: 35
    },
    contentNoteTitle: {
        marginBottom: 15
    },
    contentDeadlineNote: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    noteBottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomContainersFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomSubContainersFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})