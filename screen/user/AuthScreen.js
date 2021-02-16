import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    Platform,
    Button,
    View,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux';
import { signup, loging } from '../../store/action/auth';

import Input from '../../UI/input';
import Card from '../../UI/Card';
import Colors from '../../constants/Color';

const FORM_INPUT_SIGNUP = 'FORM_INPUT_SIGNUP'
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_SIGNUP) {
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

const AuthScreen = props => {
    const [isSignup, setIsSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState();
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer,
        {
            inputValues: {
                email: '',
                password: ''
            }, inputValidities: {
                email: false,
                password: false
            },
            formIsValid: false,
        });

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState(
            {
                type: FORM_INPUT_SIGNUP,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
    }, [dispatchFormState]);

    const authHandler = useCallback(async () => {
        try {
            setIsLoading(true);
            setErro(null);
            let action;
            if (!formState.formIsValid) {
                Alert.alert('Valor errado!',
                    'Por favor, corrija os valores no formulário.',
                    [{ text: 'Ok' }]);
                return;
            } else if (isSignup) {
                action = signup(formState.inputValues.email, formState.inputValues.password);
                await dispatch(action);
            } else {
                action = loging(formState.inputValues.email, formState.inputValues.password);
                await dispatch(action);
            }
            props.navigation.navigate('ProductsOverview');
            setIsLoading(false);
        } catch (error) {
            setErro(error.message);
            setIsLoading(false);
        }
        
    }, [formState, dispatch, setIsLoading, setErro]);

    useEffect(() => {
        if (erro) {
            Alert.alert('Ocorreu um erro!',
                erro,
                [{ text: 'Ok' }]);
        }
    }, [erro]);

    // if (isLoading) {
    //     return (
    //         <View style={styles.centered}>
    //             <ActivityIndicator size="large" color={Colors.primary} />
    //         </View>
    //     );
    // }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            keyboardVerticalOffset={50}
            style={styles.container}
        >
            <Card style={styles.card}>
                <ScrollView >
                    <Input
                        id="email"
                        text="E-mail"
                        errorInput="Por favor, digite um e-mail válido"
                        keyboardType='email-address'
                        initialValue=""
                        required
                        email
                        Capitalize='none'
                        onInputChange={inputChangeHandler}
                    ></Input>
                    <Input
                        id="password"
                        text="Senha"
                        errorInput="Por favor, digite uma senha válida"
                        keyboardType='default'
                        secureTextEntry
                        initialValue=""
                        required
                        minLength={6}
                        Capitalize='none'
                        onInputChange={inputChangeHandler}
                    ></Input>
                    <View style={styles.btnEntrar}>
                        {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> :
                            <Button title={isSignup ? "Inscrever-se" : "Entrar"} color={Colors.primary}
                                onPress={authHandler} />}
                    </View>
                    <View style={styles.btnInscrever}>
                        <Button title={`Mudar para Entrar ${isSignup ? "Entrar" : "Inscrever-se"}`}
                            color={Colors.accent} onPress={() => { setIsSignup(prevState => !prevState) }} />
                    </View>
                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400
    },
    btnEntrar: {
        paddingTop: 10
    },
    btnInscrever: {
        paddingTop: 10
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AuthScreen;