import { View, Text } from 'react-native'
import React, {useContext} from 'react'

import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../../ThemeContext';

const StatusBarComp = () => {
    const { selectedTheme } = useContext(ThemeContext);
    return (
        <StatusBar style={selectedTheme.statusBarStyle} translucent = {false} />
    )
}

export default StatusBarComp