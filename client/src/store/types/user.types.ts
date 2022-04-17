

export interface UserInputData {
    name?: string,
    email: string,
    password: string
}

export enum UserActionTypes {
    AUTH='AUTH',
    SOME_ERROR = 'SOME_ERROR',
    LOGOUT='LOGOUT',
    GET_USERS='GET_USERS',
    CHANGE_STATUS='CHANGE_STATUS',
    USER_HAS_BEEN_BLOCKED='USER_HAS_BEEN_BLOCKED',
    DELETE_USER='DELETE_USER'
}

export interface IUser {
    _id: string
    name?: string
    email: string,
    password: string,
    lastSeanse?: Date,
    blocked: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export interface LoginedUser {
    userData: IUser,
    token: string
}


//action types
export interface RegisterUser {
    type: UserActionTypes.AUTH,
    payload: IUser
}

export interface LogoutUser {
    type: UserActionTypes.LOGOUT,
    payload: []
}

export interface LoginUser {
    type: UserActionTypes.AUTH,
    payload: IUser
}

export interface SomeError {
    type: UserActionTypes.SOME_ERROR,
    payload: string
}

export interface FetchUsers {
    type: UserActionTypes.GET_USERS,
    payload: LoginedUser[]
}

export interface ChangeUserStatus {
    type: UserActionTypes.CHANGE_STATUS,
    payload?: IUser | undefined
}

export interface UserHasBennBlocked {
    type: UserActionTypes.USER_HAS_BEEN_BLOCKED,
    payload?: string
}

export interface DeleteUser {
    type: UserActionTypes.DELETE_USER,
    payload?: IUser
}
//////////////////////////////



export interface UserState {
    user?: LoginedUser,
    error?: string
}



export type TypeAction = RegisterUser | LoginUser | SomeError | LogoutUser | FetchUsers | ChangeUserStatus | UserHasBennBlocked | DeleteUser