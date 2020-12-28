import React from 'react';
import {
    View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback, Platform
} from 'react-native';

import Card from '../../UI/Card';

const ProductItem = props => {
    let TouchableElement = TouchableNativeFeedback;
    if (Platform.OS === 'ios') {
        TouchableElement = TouchableOpacity;
    };

    return (
        // <Card onSelect={props.onSelect} image={props.image} title={props.title} price={props.price} children={props.children} />
        <View style={style.product}>
            <TouchableElement onPress={props.onSelect} useForeground>
                <View>
                    <View style={style.imageContainer}>
                        <Image style={style.image} source={{ uri: props.image }} />
                    </View>
                    <View style={style.texts}>
                        <Text style={style.lable}>{props.title}</Text>
                        <Text style={style.price}>R$ {props.price.toFixed(2)}</Text>
                    </View>
                    <View style={style.buttons}>
                        {props.children}
                    </View>
                </View>
            </TouchableElement>
        </View>
    );
};

const style = StyleSheet.create({
    product: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    texts: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    lable: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        marginVertical: 4,
        fontFamily: 'open-sans'
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 20,
        height: '20%'
    }
});

export default ProductItem;