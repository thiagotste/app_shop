import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../action/orders';
import { DELETE_PRODUCT } from '../action/products';

const initialState = {
    items: {},
    totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            let cartItem;
            if (state.items[addedProduct.id]) {
                const updatedCartItem = new CartItem(state.items[addedProduct.id].quantity + 1,
                    prodPrice, prodTitle, state.items[addedProduct.id].sum + prodPrice);
                cartItem = updatedCartItem;
            } else {
                const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
                cartItem = newCartItem;
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: cartItem },
                totalAmount: state.totalAmount + prodPrice
            };

        case REMOVE_FROM_CART:
            const pid = action.pid;
            const quantity = state.items[pid].quantity;
            const item = state.items[pid];
            let updatedCartItems;
            if (quantity > 1) {
                const quantity = item.quantity - 1;
                const sum = item.price * quantity;
                const cartItem = new CartItem(quantity, item.price, item.title, sum);
                updatedCartItems = { ...state.items, [pid]: cartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - item.price
            };

        case ADD_ORDER:
            return initialState;

        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            }
            const updatedItems = { ...state.items };
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            };
    }
    return state;
}

export default cartReducer;