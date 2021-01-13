import React from 'react';
import { View, StyleSheet } from 'react-native'

const Card = (props) => {
    return (
        <View style={style.product}>
            {props.children}
        </View>
    );
};

const style = StyleSheet.create({
    product: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        padding: 20
    }
});

export default Card;