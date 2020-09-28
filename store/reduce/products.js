import PRODUCTS from '../../data/dummy-data';
import {DELETE_PRODUCT} from '../action/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(val => {
        return val.ownerId === 'u1'
    })
}

export default productsReducers = (state = initialState, action) => {
    switch(action.type){
        case DELETE_PRODUCT: 
        return {
            ...state,
            userProducts: state.userProducts.filter(product => {
                return product.id !== action.pid;
            }),
            availableProducts: state.userProducts.filter(product => {
                return product.id !== action.pid;
            }),
        };
    }

    return state;
};