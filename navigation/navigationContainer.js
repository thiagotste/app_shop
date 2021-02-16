import React, {useEffect, useRef} from 'react';
import ShopNavigator from './ShopNavigator';
import { useSelector } from 'react-redux';
import { NavigationContainer, CommonActions } from '@react-navigation/native';

const NavigationContainer = props => {
    const navRef = useRef();
    const isAuth = useSelector(state => {
        return !!state.auth.token;
    });

    useEffect(() => {
        if(!isAuth){
            navigation.dispatch(
                CommonActions.navigate({
                  name: 'Profile'
                })
              );
        }
    }, [isAuth]);

    return <ShopNavigator ref={navRef} />
};

export default NavigationContainer;