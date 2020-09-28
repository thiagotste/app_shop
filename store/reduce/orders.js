import Order from '../../models/order';
import { ADD_ORDER } from '../action/orders';
const initialState = {
    orders: []
};

const ordersReduce = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const id = new Date().toString();
            const items = action.cartItems;
            const totalAmount = action.totalAmount;
            const date = new Date();

            const order = new Order(id, items, totalAmount, date);

            return {
                ...state,
                orders: state.orders.concat(order)
            };

    }
    return state;
}

export default ordersReduce;