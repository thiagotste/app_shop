import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';

const HeaderButton = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Ionicons name={props.name} size={23} style={style.image}
                color={Platform.OS === 'android' ? 'white' : Color.primary} />
        </TouchableWithoutFeedback>
    );
};

const style = StyleSheet.create({
    image: {
        paddingHorizontal: 20
    }
});

export default HeaderButton;