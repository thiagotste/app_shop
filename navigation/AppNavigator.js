import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { ShopNavigator, AuthNav } from '../navigation/ShopNavigator';
import StartupScreen from '../screen/StartupScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => {
        return !!state.auth.token;
    });
    const didTryLogin = useSelector(state => state.auth.didTryLogin);

    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && didTryLogin && <AuthNav />}
            {!isAuth && !didTryLogin && <StartupScreen />}
        </NavigationContainer>
    );
};

export default AppNavigator;