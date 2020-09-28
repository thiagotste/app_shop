import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CartItem from './CartItem';
import Color from '../../constants/Color';

const OrdemItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={style.container}>
            <View style={style.content}>
                <Text style={style.totalAmount}>R$ {props.totalAmount.toFixed(2)}</Text>
                <Text style={style.date}>{props.date}</Text>
            </View>
            <View style={style.button}>
                <Button color={Color.primary} title={showDetails ? 'Esconder Detalhe' : 'Mostrar detalhe'} onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
                />
                {showDetails && <View style={style.detailItem}>
                    {props.items.map(cartItem => <CartItem key={cartItem.productId} quantity={cartItem.quantity}
                        productTitle={cartItem.productTitle} sum={cartItem.sum} />)}
                </View>}
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        elevation: 5,
        borderRadius: 10,
        margin: 20,
        backgroundColor: 'white'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailItem: {
        width: '100%'
    }
});

export default OrdemItem;