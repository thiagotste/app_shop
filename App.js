import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productsReducers from './store/reduce/products';
import cartReducer from './store/reduce/cart';
import 'react-native-gesture-handler';
// import NavigationContainer from './navigation/navigationContainer';
import ShopNavigator from './navigation/ShopNavigator';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import ordersReduce from './store/reduce/orders';
import authReducer from './store/reduce/auth'
import thunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';
// import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  products: productsReducers,
  cart: cartReducer,
  orders: ordersReduce,
  auth: authReducer
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={console.warn}
        onFinish={() => {
          setFontsLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );

}
