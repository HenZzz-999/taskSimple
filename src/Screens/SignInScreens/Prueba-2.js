import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState, useRef } from 'react';
import TagMenuHeaderSignIn from '../../Components/TagHeaderViews/TagMenuHeaderSignIn';

import MainContainerSignIn from '../../Components/Containers/MainContainerViewsSignIn'
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { PanGestureHandler } from 'react-native-gesture-handler';

const SPRING_CONGIF = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500
}

const Prueba = () => {

    const dimensions = useWindowDimensions();

    const top = useSharedValue(
        dimensions.height
    );

    const style = useAnimatedStyle(() => {
        return {
            top: withSpring(top.value, SPRING_CONGIF),
        };
    });

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startTop = top.value;
        },

        onActive(event, context) {
            top.value = context.startTop + event.translationY;
        },

        onEnd() {
            if (top.value > dimensions.height / 1.3 + 80) {
                top.value = dimensions.height;
            } else {
                top.value = dimensions.height / 1.3;
            }
        }
    });

    return (
        <>
            <TagMenuHeaderSignIn titleMenuHeader='Prueba'/>
            
            <MainContainerSignIn contentContainer={
                <View>
                    <Text>Prueba</Text>
                    <Pressable onPress={() => {
                        top.value = withSpring(
                            dimensions.height / 1.3,
                            SPRING_CONGIF
                        );
                    }}>
                        <Text>BottomSheet</Text>
                    </Pressable>
                </View>
            }/>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[
                    { position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35,
                    elevation: 5,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center' },
                    style]}
                    >
                    <Text>Hola</Text>
                </Animated.View>
            </PanGestureHandler>
        </>
    )
}

export default Prueba

const styles = StyleSheet.create({})