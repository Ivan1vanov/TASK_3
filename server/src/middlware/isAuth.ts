import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

export const isAuth = async (req: any, res: Response, next: NextFunction) => {
    try {


        const token = req.headers.authorization.split(' ')[1]
        if(token) {
            const decodedData: any = jwt.verify(token, 'sdf')

            req.userId = decodedData.id

        } 

        next()

    } catch (error) {
        console.log(error)
    }
}