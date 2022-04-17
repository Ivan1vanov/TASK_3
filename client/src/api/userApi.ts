import axios from "axios";
import { IUser, UserInputData } from '../store/types/user.types';



const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req: any) => {

    const info = localStorage.getItem('userTask')
    if(info) {
        req.headers.authorization = `Bearer ${info !== null ? JSON.parse(info).token : ''}`
    }
    return req
})

export const registerUserAPI = (data: UserInputData) => API.post('/api/user/registration', data)
export const loginUserAPI = (data: UserInputData) => API.post('api/user/login', data)
export const getAllUserAPI = () => API.get(`/api/user`)
export const changeUserStatusAPI = (id: string) => API.put(`/api/user/${id}`)
export const freeAllUsersAPI = (id: string) => API.put(`/api/user/active/${id}`)
export const blockAllUsersAPI = (id: string) => API.put(`/api/user/block/${id}`)
export const deleteUserAPI = (id: string) => API.delete(`/api/user/delete/${id}`)