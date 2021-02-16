import { AUTHENTICATE, LOGOUT } from '../action/auth';

const initialastate = {
    token: null,
    userId: null
}

export default authReducer = (state = initialastate, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                token: action.token,
                userId: action.userId
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
                userId: null
            }

        default:
            return state;
    }
};