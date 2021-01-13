import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = id => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://shopping-database-d9fe1.firebaseio.com/products/${id}.json`,
                {
                    method: 'DELETE',
                    headers: { "Content-Type": "text/plain" }
                });

            if (!response.ok) {
                throw new Error('Algum erro ocorreu!');
            }
            dispatch({ type: DELETE_PRODUCT, pid: id });
        } catch (erro) {
            throw erro;
        }
    }
}

export const createProduct = (title, imageUrl, price, description) => {
    return async (dispatch) => {
        const response = await fetch('https://shopping-database-d9fe1.firebaseio.com/products.json',
            {
                method: 'POST',
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({ title, imageUrl, price, description })
            });

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            product: {
                id: resData.name,
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            }
        });
    }
}

export const updateProduct = (id, title, ownerId, imageUrl, price, description) => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://shopping-database-d9fe1.firebaseio.com/products/${id}.json`,
                {
                    method: 'PATCH',
                    headers: { "Content-Type": "text/plain" },
                    body: JSON.stringify({ title, imageUrl, description })
                });

            if (!response.ok) {
                throw new Error('Algum erro ocorreu!');
            }

            dispatch(
                {
                    type: UPDATE_PRODUCT,
                    product: {
                        id: id,
                        title: title,
                        ownerId: ownerId,
                        imageUrl: imageUrl,
                        price: +price,
                        description: description
                    }
                });

        } catch (error) {
            throw error;
        }
    }
}

export const getProduct = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://shopping-database-d9fe1.firebaseio.com/products.json',
                {
                    method: 'GET',
                    headers: { "Content-Type": "text/plain" }
                });

            if (!response.ok) {
                throw new Error('Algum erro ocorreu!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (let key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        'u1',
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price)
                );
            };

            dispatch(
                {
                    type: SET_PRODUCTS,
                    products: loadedProducts
                }
            );
        } catch (erro) {
            throw erro;
        }
    };
};