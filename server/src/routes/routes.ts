import {Express} from 'express'
import userController from '../controlers/userController'
import { isAuth } from '../middlware/isAuth';


export const routes = (app: Express) => { 

    app.post('/api/user/registration', userController.registrationUser)
    app.post('/api/user/login', userController.loginUser)
    app.get('/api/user', userController.allUsers)
    app.delete('/api/user/delete/:id', isAuth, userController.deleteUser)
    app.put('/api/user/active/:id', isAuth, userController.activeUser)
    app.put('/api/user/block/:id', isAuth, userController.blockAllUsers)
} 
