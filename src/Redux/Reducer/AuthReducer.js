import { ACTION_LOGIN, ACTION_LOGOUT } from "../Action/AuthAction";

const init = {
    isLoggedIn: false,
    userInfo: {}
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case ACTION_LOGIN:
            const {userInfo} = action;
            return { ...state, isLoggedIn: true, userInfo }
        case ACTION_LOGOUT: 
            return { ...state, isLoggedIn: false, userInfo: {} }
        default:
            return state;
    }
}

export default AuthReducer;