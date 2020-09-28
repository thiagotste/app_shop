import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../UI/HeaderButton'
import Color from '../../constants/Color';
import { deleteProduct } from '../../store/action/products';

const UserProductScreen = props => {
    const userProduct = useSelector(state => {
        return state.products.userProducts;
    });

    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButton onPress={() => {
                    props.navigation.navigate('EditProductScreen')
                }} name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} />
            ),
            headerLeft: () => (
                <HeaderButton onPress={() => {
                    props.navigation.toggleDrawer()
                }} name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
            )
        });
    }, [props.navigation]);

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProductScreen', { productId: id });
    }

    return (
        <FlatList data={userProduct}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { editProductHandler(itemData.item.id) }}
                >
                    <Button onPress={() => { editProductHandler(itemData.item.id) }} title="Editar" color={Color.primary}></Button>
                    <Button onPress={() => { dispatch(deleteProduct(itemData.item.id)); }} color={Color.primary} title="Deletar"></Button>
                </ProductItem>
            } />
    );
};

export default UserProductScreen;