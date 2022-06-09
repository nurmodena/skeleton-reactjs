import { ACTION_LOGIN, ACTION_LOGOUT } from "../Action/AuthAction";

const init = {
    isLoggedIn: false,

}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case ACTION_LOGIN:
            return { ...state, isLoggedIn: action.isLoggedIn }
        case ACTION_LOGOUT:
            console.log('ACTION_LOGOUT invoked');
            return { ...state, isLoggedIn: action.isLoggedIn }
        default:
            return state;
    }
}

export default AuthReducer;