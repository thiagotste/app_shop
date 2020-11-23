import "firebase/app";
import "firebase/database";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId };
}

export const createProduct = (title, url, price, description) => {
    var formData = new FormData();
    formData.append('title', title);
    formData.append('imageUrl', url);
    formData.append('price', price);
    formData.append('description', description);
    return async dispatch => {
        const response = await fetch('https://shopping-database-d9fe1.firebaseio.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        });

        // response.json().then(res => {
        //     console.log(JSON.parse(res));
        // });

        const resData = await response.json();

        console.log('resdata', resData.title);

        dispatch(
            {
                type: CREATE_PRODUCT,
                product: {
                    title: title,
                    imageUrl: url,
                    price: price,
                    description: description
                }
            });
    };
};

export const updateProduct = (id, title, ownerId, url, price, description) => {
    return {
        type: UPDATE_PRODUCT,
        product: {
            id: id,
            title: title,
            ownerId: ownerId,
            imageUrl: url,
            price: +price,
            description: description
        }
    };
}