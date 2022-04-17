import { TypeAction, UserActionTypes, UserState, IUser } from '../types/user.types';


const initializeState = {
    error: null,
    auth: [],
    users: []
}


export const userReducer = (state = initializeState, action: TypeAction) => {
        switch (action.type) {

            case UserActionTypes.AUTH:
                localStorage.setItem('userTask', JSON.stringify(action.payload))
            return {auth: action.payload, error: null}

            case UserActionTypes.SOME_ERROR:
            return {error: action.payload}

            case UserActionTypes.LOGOUT: 
                localStorage.clear()
            return state

            case UserActionTypes.GET_USERS: 
            return {users: action.payload}

            case UserActionTypes.CHANGE_STATUS:
                return {
                    ...state,
                    users: state.users.map((user: IUser) => user._id === action.payload?._id ? action.payload : user)
                }
            
            case UserActionTypes.USER_HAS_BEEN_BLOCKED: 
            return {
                error: action.payload
            }

            case UserActionTypes.DELETE_USER: 
            return {
                ...state,
                users: state.users.filter((user: IUser) => user._id !== action.payload?._id)
            }

            default: 
            return state
        }
}