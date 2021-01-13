export const SIGN_UP = 'SIGN_UP';


export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEpjYN5-82hQq-2ZrfCxvZXjCoa4ytBws',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            throw new Error('Alguma coisa aconteceu');
        }

        const resData = await response.json();

        console.log(resData);

        dispatch(
            {
                type: SIGN_UP,
                email,
                password
            }
        );
    };
}