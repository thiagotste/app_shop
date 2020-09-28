import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import HeaderButton from '../../UI/HeaderButton';
import Colors from '../../constants/Color';
import { useSelector } from 'react-redux';


const EditProductScreen = props => {
    const { productId } = props.route.params || '';
    const product = useSelector(state => {
        return state.products.availableProducts.find(ele => ele.id === productId);
    });
    const [title, setTitle] = useState(product ? product.title : '');
    const [url, setUrl] = useState(product ? product.imageUrl : '');
    const [price, setPrice] = useState(product ? product.price.toString() : '');
    const [description, setDescription] = useState(product ? product.description : '');

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 160}}>
                    <Text style={{fontSize: 15, color: Platform.OS === 'android' ? 'white' : Colors.primary}}>{productId ? 'Editar' : 'Adicionar'}</Text>
                    <HeaderButton onPress={() => {
                        
                    }} name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} />
                </View>
            )
        });
    }, [props.navigation]);

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={style.container}>
                <View style={style.inputView}>
                    <Text style={style.text}>Título</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={text => setTitle(text)}
                        value={title}
                    />
                </View>
                <View style={style.inputView}>
                    <Text style={style.text}>Url da imagem</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={text => setUrl(text)}
                        value={url}
                    />
                </View>
                <View style={style.inputView}>
                    <Text style={style.text}>Preço</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={text => setPrice(text)}
                        value={price}
                    />
                </View>
                <View style={style.inputView}>
                    <Text style={style.text}>Descrição</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={text => setDescription(text)}
                        value={description}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        padding: 20
    },
    inputView: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%'
    },
    input: {
        fontSize: 15,
        fontFamily: 'open-sans',
        paddingHorizontal: 2,
        paddingVertical: 5
    },
    text: {
        marginVertical: 8,
        fontFamily: 'open-sans-bold',
        fontSize: 15
    }
});

export default EditProductScreen;