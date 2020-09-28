import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as CartActions from '../../store/action/cart';
import HeaderButton from '../../UI/HeaderButton';
import Color from '../../constants/Color';


const ProductsOverviewScreen = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => {
        return state.products.availableProducts;
    });

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

    return (
        <FlatList
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

export default ProductsOverviewScreen;