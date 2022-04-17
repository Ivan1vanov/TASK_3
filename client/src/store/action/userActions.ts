import { UserInputData, UserActionTypes } from '../types/user.types';
import * as api from '../../api/userApi'
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';



export const loginUserAction = (userData: UserInputData) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.loginUserAPI(userData)
        // console.log(data)
        dispatch({type: UserActionTypes.AUTH, payload: data})
    } catch (error: any) {
        const err = error as AxiosError
        if (err.response) {
            dispatch({type: UserActionTypes.SOME_ERROR, payload: err.response.data.message})
        }
        
    }
}

export const registrationAction = (userData: UserInputData) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.registerUserAPI(userData)
        // console.log(userData)
        dispatch({type: UserActionTypes.AUTH, payload: data})
    } catch (error: any) {
        const err = error as AxiosError
        if (err.response) {
            dispatch({type: UserActionTypes.SOME_ERROR, payload: err.response.data.message})
        }
    }
}

export const getAllUsersAction = () => async (dispatch: Dispatch) => {
        try {
            const {data} = await api.getAllUserAPI()
            dispatch({type: UserActionTypes.GET_USERS, payload: data.users})
        } catch (error) {
            console.log(error)
        }
}

export const changeUserStatusAction = (id: string, navigate: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.changeUserStatusAPI(id)
        dispatch({type: UserActionTypes.CHANGE_STATUS, payload: data.user})
    } catch (error) {
        const err = error as AxiosError 
        if (err.response) {
            dispatch({type: UserActionTypes.LOGOUT})
            navigate('/auth')
            dispatch({type: UserActionTypes.USER_HAS_BEEN_BLOCKED, payload: err.response.data.message})
        }
    }
}


export const activeAllusersAction = (id: string, navigate: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.freeAllUsersAPI(id)
        dispatch({type: UserActionTypes.CHANGE_STATUS, payload: data.user})
    } catch (error) {
        dispatch({type: UserActionTypes.LOGOUT})
        const err = error as AxiosError 
        if (err.response) {
            dispatch({type: UserActionTypes.LOGOUT})
            navigate('/auth')
            dispatch({type: UserActionTypes.USER_HAS_BEEN_BLOCKED, payload: err.response.data.message})
        }
    }
}

export const blockAllUsersAction = (id: string, navigate: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.blockAllUsersAPI(id)
        dispatch({type: UserActionTypes.CHANGE_STATUS, payload: data.user})
    } catch (error) {
        const err = error as AxiosError 
        if (err.response) {
            dispatch({type: UserActionTypes.LOGOUT})
            navigate('/auth')
            dispatch({type: UserActionTypes.USER_HAS_BEEN_BLOCKED, payload: err.response.data.message})
        }
    }
}

export const deleteUserAction = (id: string, navigate: any) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.deleteUserAPI(id)
        dispatch({type: UserActionTypes.DELETE_USER, payload: data.user})
    } catch (error) {
        const err = error as AxiosError 
        if (err.response) {
            dispatch({type: UserActionTypes.LOGOUT})
            navigate('/auth')
            dispatch({type: UserActionTypes.USER_HAS_BEEN_BLOCKED, payload: err.response.data.message})
        }
    }
}
