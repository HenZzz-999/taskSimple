import { StyleSheet, Text, View, Animated, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GlobalContexts } from '../../../GlobalContexts';
import { ThemeContext } from '../../../ThemeContext';


const BottomSheetDef = ({ sheetRef, snapPoint, contentModal }) => {

    const { zIndex, colorBgPopUpStyle, handleClosePress } = useContext(GlobalContexts);
    const { selectedTheme } = useContext(ThemeContext);

    const closeModalDinamic = () => {
        sheetRef.current.close()
    }

    return (
        <Animated.View style={[{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: zIndex, }, colorBgPopUpStyle]}>
            <Pressable onPress={() => {handleClosePress(); closeModalDinamic();}} style={{flex: 1, width: '100%',}}>
            </Pressable>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={sheetRef}
                    snapPoints={snapPoint}
                    enablePanDownToClose={false}
                    handleIndicatorStyle={{backgroundColor: selectedTheme.darkSecundary}}
                    backgroundStyle={{backgroundColor: selectedTheme.darkAccent, borderRadius: 30}}
                >
                    {contentModal}
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </Animated.View>
    )
}

export default BottomSheetDef

const styles = StyleSheet.create({})