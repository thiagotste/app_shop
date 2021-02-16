import React from 'react';
import { FlatList, Platform, Button, Alert, StyleSheet, View, Text } from 'react-native';
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

    const deleteHandler = (id) => {
        Alert.alert('Você tem certeza?', 'Você quer mesmo deletar esse item?',
            [
                { text: 'Não', style: 'default' },
                { text: 'Sim', style: 'destructive', onPress: () => { dispatch(deleteProduct(id))}}
            ]);
    };

    if ( userProduct.length === 0) {
        return <View style={styles.centered}>
            <Text>Nenhum produto encontrado!</Text>
        </View>
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
                    <Button onPress={ deleteHandler.bind(this, itemData.item.id) } color={Color.primary} title="Deletar"></Button>
                </ProductItem>
            } />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductScreen;