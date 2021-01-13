import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Color';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/action/cart';
import { addOrder } from '../../store/action/orders';

const CartScreen = props => {
    const [isloading, setIsloading] = useState(false);
    const [error, setError] = useState();
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

    const sendOrder = useCallback(async () => {
        setIsloading(true);
        setError(null);
        try {
            await dispatch(
                addOrder(cartItem, totalAmount)
            )
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
            setErro(error.message);
        }
    }, [cartItem, totalAmount]);

    useEffect(() => {
        if (error) {
            Alert.alert('Ocorreu um erro!',
                error,
                [{ text: 'Ok' }]);
        }
    }, [error]);

    return (
        <View style={style.container}>
            <View style={style.amount}>
                <Text style={style.amountText}>Total: <Text style={style.amountColor}>R${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text></Text>

                {isloading ? <ActivityIndicator size="small" color={Colors.primary} color={Colors.primary} /> :
                    (
                        <Button
                            color={Colors.accent}
                            title="Fazer pedido"
                            disabled={cartItem.length === 0}
                            onPress={sendOrder}
                        ></Button>
                    )
                }
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
        color: Colors.primary
    },
    list: {
        backgroundColor: 'white'
    }
});

export default CartScreen;