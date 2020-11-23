import React from 'react';
import { StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';

const HeaderButton = props => {
    let TouchableElement = TouchableNativeFeedback;
    if (Platform.OS === 'ios') {
        TouchableElement = TouchableOpacity;
    };
    return (
        <TouchableElement onPress={props.onPress} useForeground>
            <Ionicons name={props.name} size={23} style={style.image}
                color={Platform.OS === 'android' ? 'white' : Color.primary} />
        </TouchableElement>
    );
};

const style = StyleSheet.create({
    image: {
        paddingHorizontal: 20
    }
});

export default HeaderButton;