import React from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../constants/Color';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/action/cart';
import { addOrder } from '../../store/action/orders';

const CartScreen = props => {
    const totalAmount = useSelector(state => {
        return state.cart.totalAmount;
    });
    const cartItem = useSelector(state => {
        const cartArray = [];
        for (const key in state.cart.items) {
            cartArray.push(
                {
                    productId: key,
                    productTitle: state.cart.items[key].title,
                    productPrice: state.cart.items[key].price,
                    quantity: state.cart.items[key].quantity,
                    sum: state.cart.items[key].sum
                }
            );
        }
        return cartArray.sort((a, b) => {
            return a.productId > b.productId ? 1 : -1;
        });
    });

    const dispatch = useDispatch();

    return (
        <View style={style.container}>
            <View style={style.amount}>
                <Text style={style.amountText}>Total: <Text style={style.amountColor}>R${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text></Text>
                <Button
                    color={Color.accent}
                    title="Fazer pedido"
                    disabled={cartItem.length === 0}
                    onPress={() => dispatch(addOrder(cartItem, totalAmount))}
                ></Button>
            </View>
            <View>
                <FlatList
                    data={cartItem}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => (
                        <CartItem
                            quantity={itemData.item.quantity}
                            sum={itemData.item.sum}
                            productPrice={itemData.item.productPrice}
                            productTitle={itemData.item.productTitle}
                            deletable
                            onPress={() => { dispatch(removeFromCart(itemData.item.productId)) }} />
                    )}
                />
            </View>
        </View>
    );

};

const style = StyleSheet.create({
    container: {
        margin: 20
    },
    amount: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    amountText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amountColor: {
        color: Color.primary
    },
    list: {
        backgroundColor: 'white'
    }
});

export default CartScreen;