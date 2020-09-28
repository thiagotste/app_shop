import React from 'react';
import { View, Text, StyleSheet, Image, Button , ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../constants/Color';
import * as CartAction from '../../store/action/cart';

const ProductDetail = props => {
    const dispatch = useDispatch();
    const { productId } = props.route.params;
    const product = useSelector(state => {
        return state.products.availableProducts.find((value) => {
            return value.id === productId;
        });
    });
    props.navigation.setOptions({ title: product.title })
    return (
        <ScrollView style={style.product}>
            <View style={style.imageContainer}>
                <Image style={style.image} source={{ uri: product.imageUrl }} />
            </View>
            <View style={style.buttonCart}>
                <Button  onPress={() => {
                    dispatch(CartAction.addToCart(product));
                }} color={Color.primary} title="Adicionar ao Cart"></Button>
            </View>
            <View style={style.texto}>
                <Text style={style.price}>
                    R$ {product.price}
                </Text>
                <Text style={style.description}>
                    {product.description}
                </Text>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    product: {
        flex: 1
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 300,
        width: '100%'
    },
    buttonCart: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    texto: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    }
});

export default ProductDetail;