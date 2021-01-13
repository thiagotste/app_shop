import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        try {
            const date = new Date();
            const response = await fetch(
                `https://shopping-database-d9fe1.firebaseio.com/orders/u1.json`,
                {
                    method: 'POST',
                    headers: { "Content-Type": "text/plain" },
                    body: JSON.stringify(
                        {
                            cartItems,
                            totalAmount,
                            date: date.toISOString()
                        })
                });

            if (!response.ok) {
                throw new Error('Algum erro ocorreu!');
            }

            const resData = await response.json();

            dispatch(
                { 
                    type: ADD_ORDER,
                    id: resData.name,
                    cartItems, totalAmount,
                    date: date.toISOString()
                }
            );
        } catch (error) {
            throw error
        }

    }
}

export const getOrders = (ownerId = 'u1') => {
    return async dispatch => {
        try {
            const response = await fetch(`https://shopping-database-d9fe1.firebaseio.com/orders/${ownerId}.json`,
                {
                    method: 'GET',
                    headers: { "Content-Type": "text/plain" }
                });

            if (!response.ok) {
                throw new Error('Algum erro ocorreu!');
            }

            const resData = await response.json();
            const loadedOrders = [];

            for (let key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                         new Date(resData[key].date))
                );
            };

            dispatch(
                {
                    type: SET_ORDERS,
                    orders: loadedOrders
                }
            );
        } catch (erro) {
            throw erro;
        }
    };
};