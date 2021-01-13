import React, { useEffect, useState, useCallback } from 'react';
import {
    FlatList, Platform, Button,
    ActivityIndicator, View, StyleSheet, Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as CartActions from '../../store/action/cart';
import HeaderButton from '../../UI/HeaderButton';
import Color from '../../constants/Color';
import { getProduct } from '../../store/action/products';
import Colors from '../../constants/Color';
import { useFocusEffect } from '@react-navigation/native';



const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoding] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const products = useSelector(state => {
        return state.products.availableProducts;
    });

    const loadingProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(getProduct());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [setIsLoding, dispatch, setError]);

    //react navigation drawer não atauliza os dados da tela
    //quando navegamos pelas telas, pega sempre do cache
    //pode usar um listener ou hook para resolver o probelema

    // useEffect(() => {
    //     const focusListener = props.navigation.addListener('focus', () => {
    //         loadingProducts();

    //         return () => focusListener.remove();
    //     })
    // }, [loadingProducts]);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = loadingProducts();

            return () => unsubscribe;
        }, [loadingProducts])
    );

    useEffect(() => {
        setIsLoding(true);
        loadingProducts().then(() => {
            setIsLoding(false);
        });
    }, [dispatch, loadingProducts]);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButton onPress={() => {
                    props.navigation.navigate('CartScreen')
                }} name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} />
            ),
            headerLeft: () => (
                <HeaderButton onPress={() => {
                    props.navigation.toggleDrawer()
                }} name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
            )
        });
    }, [props.navigation]);

    const selectItemHandler = (id) => {
        props.navigation.navigate('ProductsDetail', {
            productId: id
        });
    };

    if (error) {
        return <View style={styles.centered}>
            <Text>Um erro ocorreu!</Text>
            <Button title="Tenta de novo!" onPress={loadingProducts} />
        </View>
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} color={Colors.primary} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={styles.centered}>
            <Text>Nenhum produto encontrado!</Text>
        </View>
    }

    return (
        <FlatList
            onRefresh={loadingProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id)
                    }}
                >
                    <Button onPress={() => {
                        selectItemHandler(itemData.item.id);
                    }} title="Ver Detalhe" color={Color.primary}></Button>
                    <Button onPress={() => {
                        dispatch(CartActions.addToCart(itemData.item));
                    }} color={Color.primary} title="Cart"></Button>
                </ProductItem>
            } />
    )
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;