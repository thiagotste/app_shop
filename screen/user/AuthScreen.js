import React, {useReducer, useCallback} from 'react';
import { KeyboardAvoidingView, StyleSheet, ScrollView, Platform, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/action/auth';

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
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer,
        {
            inputValues: {
                email: '',
                password: ''
            }, inputValidities: {
                email : false,
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

        const inscrever =  useCallback(() => {
            dispatch(signup(formState.inputValues.email, formState.inputValues.password));
        }, [formState, dispatch]);

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
                        <Button title="Entrar" color={Colors.primary} onPress={inscrever} />
                    </View>
                    <View style={styles.btnInscrever}>
                        <Button title="Inscrever-se" color={Colors.accent} onPress={() => { }} />
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
    btnInscrever:{
        paddingTop: 10
    }
});

export default AuthScreen;