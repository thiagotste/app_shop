import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, FlatList, Platform, View, Text, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../UI/HeaderButton';
import OrdemItem from '../../components/shop/OrdemItem';
import { getOrders } from '../../store/action/orders';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/Color';

const OrderScreen = props => {
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState()
    const dispatch = useDispatch();
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

    const loadingOrders = useCallback(async () => {
        setError(null);
        setIsloading(true);
        try {
            await dispatch(getOrders());
        } catch (error) {
            setError(error.message);
        }
        setIsloading(false);
    }, [setIsloading, dispatch, setError]);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe =  loadingOrders();

            return () => unsubscribe;
        }, [loadingOrders])
    );

    useEffect(() =>{
        loadingOrders();
    }, [dispatch, loadingOrders]);

    if (error) {
        return <View style={styles.centered}>
            <Text>Um erro ocorreu!</Text>
            <Button title="Tenta de novo!" onPress={loadingProducts}/>
        </View>
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} color={Colors.primary} />
        </View>
    }

    if (!isLoading && orders.length === 0) {
        return <View style={styles.centered}>
            <Text>Nenhum pedido encontrado!</Text>
        </View>
    }

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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrderScreen;