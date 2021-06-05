import AsyncStorage from '@react-native-community/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;

export const setDidTryAl = () => {
    return { type: SET_DID_TRY_AL }
  }

export const authenticate = (token, userId, expiryTimer) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTimer));``
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
}

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
            const errorData = await response.json();
            const errorMessage = errorData.error.message;
            let message = 'Alguma coisa aconteceu';

            if (errorMessage === 'EMAIL_EXISTS') {
                message = 'Email existe.';
            } else if (errorMessage === 'OPERATION_NOT_ALLOWED') {
                message = 'Operação não permitida.';
            } else {
                message = 'Muitas tentativas. Operações neste dispositivo foram bloqueadas.';
            }
            throw new Error(message);
        }

        const resData = await response.json();

        dispatch(authenticate(resData.idToken, resData.localId, parseInt(res.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDate(resData.idToken, resData.localId, expirationDate);
    };
};

export const loging = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEpjYN5-82hQq-2ZrfCxvZXjCoa4ytBws',
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
            const errorData = await response.json();
            const errorMessage = errorData.error.message;
            let message = 'Alguma coisa aconteceu';

            if (errorMessage === 'EMAIL_NOT_FOUND') {
                message = 'Email não encontrado.';
            } else if (errorMessage === 'INVALID_PASSWORD') {
                message = 'A senha ou o usuário inválidos.';
            } else {
                message = 'A conta do usuário foi desabilitada.';
            }
            throw new Error(message);
        }

        const resData = await response.json();

        // console.log(resData);

        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDate(resData.idToken, resData.localId, expirationDate);
    };
};

export const logout = () => {
    clearLogoutTimer();
    saveDate(null, null, new Date());
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationTimer => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTimer);
    }
};

const saveDate = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
};