import React from 'react';
import { View, TouchableElement, Text, Image, StyleSheet } from 'react-native'

const Card = ( props ) => {
    console.log(props.title);
    return (
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
        marginHorizontal: 15
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

export default Card;