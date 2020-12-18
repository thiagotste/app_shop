import PRODUCTS from '../../data/dummy-data';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../action/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(val => {
        return val.ownerId === 'u1'
    })
}

export default productsReducers = (state = initialState, action) => {
    switch (action.type) {
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

        case CREATE_PRODUCT:
            let arrayProducts = [...state.availableProducts];

            const product = new Product(
                action.product.id,
                'u1', 
                action.product.title,
                action.product.imageUrl,
                action.product.description,
                +action.product.price
            );

            arrayProducts.push(product);

            return {
                ...state,
                availableProducts: arrayProducts,
                userProducts: arrayProducts.filter(val => {
                    return val.ownerId === 'u1'
                })
            };

        case UPDATE_PRODUCT:
            let arrayProductsUpdate = [...state.availableProducts];

            const productUpdate = action.product;
            let indexProduct = arrayProductsUpdate.findIndex((element) => {
                return element.id === productUpdate.id;
            });

            arrayProductsUpdate[indexProduct] = productUpdate;

            return {
                ...state,
                availableProducts: arrayProductsUpdate,
                userProducts: arrayProductsUpdate.filter(val => {
                    return val.ownerId === 'u1'
                })
            };
    }

    return state;
};