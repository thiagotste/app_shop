import React from 'react';
import { Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import ProductsOverviewScreen from '../screen/shop/ProductsOverviewScreen';
import ProductDetail from '../screen/shop/ProductDetailScreen';
import CartScreen from '../screen/shop/CartScreen';
import OrderScreen from '../screen/shop/OrdersScreen';
import UserProductScreen from '../screen/user/UserProductScreen';
import EditProductScreen from '../screen/user/EditProductScreen';
import Colors from '../constants/Color';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from '../screen/user/AuthScreen';
import StartupScreen from '../screen/StartupScreen';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/action/auth';

const AuthNavigator = createStackNavigator();
const ProductNavigator = createStackNavigator();
const OrdersNavigator = createStackNavigator();
const AdminNavigator = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();
const StartupScreenNavigator = createStackNavigator();

const productNavigator = () => {
    return (
        // <NavigationContainer initialRouteName="ProductsOverview">
        <ProductNavigator.Navigator screenOptions={ProductNavigatorStyle} initialRouteName="ProductsOverview">
            <ProductNavigator.Screen name="ProductsOverview" options={{ title: 'Produtos' }} component={ProductsOverviewScreen} />
            <ProductNavigator.Screen name="ProductsDetail" options={{ title: 'Detalhes' }} component={ProductDetail} />
            <ProductNavigator.Screen name="CartScreen" options={{ title: 'Cart' }} component={CartScreen} />
        </ProductNavigator.Navigator>
        // </NavigationContainer>
    )
};

const ordersNavigator = () => {
    return (
        <OrdersNavigator.Navigator screenOptions={ProductNavigatorStyle}>
            <OrdersNavigator.Screen name="OrderScreen" options={{ title: 'Order' }} component={OrderScreen} />
        </OrdersNavigator.Navigator>
    );
}

const adminNavigator = () => {
    return (
        <AdminNavigator.Navigator screenOptions={ProductNavigatorStyle} initialRouteName="UserProductScreen">
            <AdminNavigator.Screen name="UserProductScreen" options={{ title: 'Seus Produtos' }} component={UserProductScreen} />
            <AdminNavigator.Screen name="EditProductScreen" options={{ title: 'Seus produtos' }} component={EditProductScreen} />
        </AdminNavigator.Navigator>
    );
};

const startupScreenNavigator = () => {
    return (
        <StartupScreenNavigator.Navigator >
            <StartupScreenNavigator.Screen name="StartupScreen" component={StartupScreen} />
        </StartupScreenNavigator.Navigator>
    );
}

function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    const component = () =>
        <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 40, backgroundColor: Colors.primary
        }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Sair</Text>
        </View>

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label={component}
                onPress={() => {
                    dispatch(logout());
                    // props.navigation.navigate('Startup');
                }}
                labelStyle={{
                    color: 'white',
                    backgroundColor: 'red',
                }}
            />
        </DrawerContentScrollView>
    );
}

const shopNavigator = () => {
    const auth = useSelector(state => {
        return state.auth;
    });
    return (
        <NavigationContainer>
            {auth.token !== null ?
                (
                    <DrawerNavigator.Navigator drawerContentOptions={DrawerNavigatorStyle}
                        drawerContent={props => <CustomDrawerContent {...props} />}>
                        <DrawerNavigator.Screen name="Products" options={{ title: 'Produtos', drawerIcon: drawerIconProducts }} component={productNavigator} />
                        <DrawerNavigator.Screen name="Orders" options={{ title: 'Pedidos', drawerIcon: drawerIconOrders }} component={ordersNavigator} />
                        <DrawerNavigator.Screen name="Admin" options={{ title: 'Admin', drawerIcon: drawerIconAdmin }} component={adminNavigator} />
                    </DrawerNavigator.Navigator>
                ) :
                (
                    <AuthNavigator.Navigator screenOptions={ProductNavigatorStyle} initialRouteName="Startup">
                        <AuthNavigator.Screen name="Startup" component={startupScreenNavigator} />
                        <AuthNavigator.Screen name="AuthScreen" options={{ title: 'Seus Produtos' }} component={AuthScreen} />
                    </AuthNavigator.Navigator>
                )
            }
        </NavigationContainer>
    );
}

const ProductNavigatorStyle = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const DrawerNavigatorStyle = {
    activeTintColor: Platform.OS === 'android' ? Colors.primary : '',
};

const drawerIconProducts = (props) => {
    return <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23}
        color={props.color} />
};

const drawerIconOrders = (props) => {
    return <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23}
        color={props.color} />
};

const drawerIconAdmin = (props) => {
    return <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23}
        color={props.color} />
};

export default shopNavigator;