import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducers from './store/reduce/products';
import cartReducer from './store/reduce/cart';
import 'react-native-gesture-handler';
import ShopNavigator from './navigation/ShopNavigator';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import ordersReduce from './store/reduce/orders'
// import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  products: productsReducers,
  cart: cartReducer,
  orders: ordersReduce
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer);

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
      <ShopNavigator />
    </Provider>
  );

}