import Order from '../../models/order';
import { ADD_ORDER, SET_ORDERS } from '../action/orders';
const initialState = {
    orders: []
};

const ordersReduce = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const id = action.id;
            const items = action.cartItems;
            const totalAmount = action.totalAmount;
            const date = action.date;

            const order = new Order(id, items, totalAmount, date);

            return {
                ...state,
                orders: state.orders.concat(order)
            };

        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }

    }
    return state;
}

export default ordersReduce;