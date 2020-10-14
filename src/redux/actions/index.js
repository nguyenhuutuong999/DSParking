import * as types from "./../constants/index";

export const login = (account) =>{
    return {
        type: types.LOGIN,
        account,
    }
}
export const logout = () =>{
    return {
        type: types.LOGOUT,
    }
}