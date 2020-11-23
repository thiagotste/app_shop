import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const INPUT_BLUR = 'INPUT_BLUR';
const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid

            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state;
    }
}

const Input = props => {
    const [state, dispatch] = useReducer(formReducer,
        {
            value: props.initialValue ? props.initialValue : '',
            isValid: props.initialValid,
            touched: false

        }
    );

    const { onInputChange, id } = props;

    useEffect(() => {
        if (state.touched) {
            onInputChange(id, state.value, state.isValid);
        }
    }, [state, onInputChange, id]);

    const txtChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: FORM_INPUT_UPDATE, value: text, isValid });
    }

    const lostFocus = () => {
        dispatch({ type: INPUT_BLUR });
    }

    return (
        <View style={styles.componentView}>
            <View style={styles.inputView}>
                <Text style={styles.text}>{props.text}</Text>
                <TextInput
                    {...props}
                    style={styles.input}
                    onChangeText={txtChangeHandler}
                    onBlur={lostFocus}
                    value={state.value}
                />
            </View>
            { !state.isValid && state.touched &&
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorInput}</Text>
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    // componentView: {
    //     marginBottom: 10
    // },
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
    },
    errorContainer: {
        marginVertical: 15
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
});

export default Input;