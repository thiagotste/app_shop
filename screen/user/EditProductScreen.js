import React, {
    useCallback, useEffect, useReducer,
    useState
} from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    Platform, ActivityIndicator, Alert,
    KeyboardAvoidingView
} from 'react-native';
import HeaderButton from '../../UI/HeaderButton';
import Colors from '../../constants/Color';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/action/products';
import Input from '../../UI/input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let formIsValid = true;
        for (const key in updatedValidities) {

            formIsValid = formIsValid && updatedValidities[key];
        }
        return {
            formIsValid: formIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    return state;
};

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const { productId } = props.route.params || '';
    const product = useSelector(state => {
        return state.products.availableProducts.find(ele => ele.id === productId);
    });
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer,
        {
            inputValues: {
                title: product ? product.title : '',
                imageUrl: product ? product.imageUrl : '',
                price: '',
                description: product ? product.description : ''
            }, inputValidities: {
                title: product ? true : false,
                imageUrl: product ? true : false,
                price: product ? true : false,
                description: product ? true : false
            }, formIsValid: product ? true : false,
        });


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState(
            {
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
    }, [dispatchFormState]);

    const submitHandler = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            if (!formState.formIsValid) {
                Alert.alert('Valor errado!',
                    'Por favor, corrija os valores no formulário.',
                    [{ text: 'Ok' }]);
                return;
            }
            productId ? await dispatch(updateProduct(
                product.id,
                formState.inputValues.title,
                product.ownerId,
                formState.inputValues.imageUrl,
                formState.inputValues.price,
                formState.inputValues.description)) :
                await dispatch(createProduct(
                    formState.inputValues.title,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price,
                    formState.inputValues.description));
            setIsLoading(false);
            props.navigation.goBack();
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    }, [dispatch, formState, setError, setIsLoading]);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 160 }}>
                    <Text style={{ fontSize: 15, color: Platform.OS === 'android' ? 'white' : Colors.primary }}>{productId ? 'Editar' : 'Adicionar'}</Text>
                    <HeaderButton onPress={submitHandler}
                        name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} />
                </View>
            )
        });
    }, [props.navigation, submitHandler]);

    useEffect(() => {
        if (error) {
            Alert.alert('Ocorreu um erro!',
                error,
                [{ text: 'Ok' }]);
        }
    }, [error]);

    if (isLoading) {
        return <View style={style.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={style.container}>
                    <Input
                        id="title"
                        text="Título"
                        errorInput="Por favor, digite um título válido"
                        keyboardType='default'
                        initialValue={product ? product.title : ''}
                        initialValid={!!product}
                        Capitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        required
                        onInputChange={inputChangeHandler}
                    ></Input>
                    <Input
                        id="imageUrl"
                        text="Url da imagem"
                        errorInput="Por favor, digite uma Url da imagem válida"
                        keyboardType='default'
                        returnKeyType='next'
                        initialValue={product ? product.imageUrl : ''}
                        initialValid={!!product}
                        required
                        onInputChange={inputChangeHandler}
                    ></Input>

                    {productId ? null :
                        (
                            <Input
                                id="price"
                                text="Preço"
                                errorInput="Por favor, digite um preço válido"
                                keyboardType='decimal-pad'
                                returnKeyType='next'
                                required
                                min={0.1}
                                onInputChange={inputChangeHandler}
                            ></Input>)}

                    <Input
                        id="description"
                        text="Descrição"
                        errorInput="Por favor, digite uma descrição válida"
                        keyboardType='default'
                        multiline
                        numberOfLines={3}
                        initialValue={product ? product.description : ''}
                        initialValid={!!product}
                        required
                        minLength={5}
                        onInputChange={inputChangeHandler}
                    ></Input>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const style = StyleSheet.create({
    container: {
        padding: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;