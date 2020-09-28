import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../constants/Color';

const CartItem = props => {
    return (
        <View style={style.cartItem}>
            <View style={style.cartItem_1}>
                <Text style={style.quantity}>{props.quantity}</Text>
                <Text style={style.title}>{props.productTitle}</Text>
            </View>
            <View style={style.cartItem_2}>
                <Text style={style.sum}>R${props.sum.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onPress}>
                <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} style={style.image}
                color={Platform.OS === 'android' ? 'red' : Color.primary} />
                </TouchableOpacity>}
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    cartItem_1: {
        flexDirection: 'row',
        marginLeft: 30
    },
    cartItem_2: {
        flexDirection: 'row',
        marginRight: 30
    },
    quantity: {
        fontFamily: 'open-sans',
        fontSize: 15
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        marginLeft: 5
    },
    quantity: {
        fontFamily: 'open-sans',
        fontSize: 15
    },
    sum: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        marginRight: 5
    },
    image: {
        paddingLeft: 5
    }
});

export default CartItem;