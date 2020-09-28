import React from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderButton from '../../UI/HeaderButton';
import OrdemItem from '../../components/shop/OrdemItem';

const OrderScreen = props => {
    const orders = useSelector(state => {
        return state.orders.orders;
    });
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <HeaderButton onPress={() => {
                    props.navigation.toggleDrawer()
                }} name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
            )
        });
    }, [props.navigation]);
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrdemItem totalAmount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}/>
            )}
        />
    )
};

const style = StyleSheet.create({

});

export default OrderScreen;