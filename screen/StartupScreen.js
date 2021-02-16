import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Color from '../constants/Color';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/action/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const tryLoging = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('AuthScreen');
                return;
            }
            const transformedDate = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedDate;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date || !token || !userId) {
                props.navigation.navigate('AuthScreen');
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date()-getTime();

            props.navigation.navigate('ProductsOverview');
            dispatch(authenticate(token, userId, expirationTime));
        }

        tryLoging();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Color.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;