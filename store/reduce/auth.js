import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../action/auth';

const initialastate = {
    token: null,
    userId: null,
    SET_DID_TRY_AL
}

export default authReducer = (state = initialastate, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                didTryLogin: true
            }

        // case SIGN_UP:
        //     return {
        //         ...initialastate,
        //         token: action.token,
        //         userId: action.userId
        //     }

        case LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                didTryLogin: true
            }

        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryLogin: true
            }

        default:
            return state;
    }
};