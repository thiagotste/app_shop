// import FireConfig from '../fireConfig';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId };
}

export const createProduct = (title, imageUrl, price, description) => {
    return async (dispatch) => {
        // const data = new FireConfig();

        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('imageUrl', imageUrl);
        // formData.append('price', price);
        // formData.append('description', description);

        // const database = data.database;

        // const products = database.ref('products');
        // const newPostRef = products.push();
        // newPostRef.set(formData).then((result) => {
        //     console.log('sucesso');
        // });
        const response = await fetch('https://shopping-database-d9fe1.firebaseio.com/products.json',
            {
                method: 'POST',
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({title, imageUrl, price, description})
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

