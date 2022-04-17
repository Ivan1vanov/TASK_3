import { Request, Response } from "express"
import { User, UserInterface } from '../models/userModel';
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

const jwtTokenGenerator = (id: mongoose.ObjectId, email: string, name: string):string => {
    return jwt.sign({id, email, name}, 'sdf', {expiresIn: '24h'})
}


class UserControllers {

            async registrationUser(req: Request, res: Response) {
                const userData = req.body
        
                try {
                    if(!userData.name && !userData.password) {
                        res.status(500).send({
                            message: 'Invalid credentials'
                        })
                    }
        
                    const isExists: UserInterface | null = await User.findOne({email: userData.email})
        
                    if(isExists) {
                        res.status(500).send({
                            message: 'User already exists'
                        })
                    } else {
                        const hashPassword = bcrypt.hashSync(userData.password, 8)
        
                        const newUser = await User.create({name: userData.name.trim(), email: userData.email.trim(), password: hashPassword.trim()})
       
                      newUser.set({
                            lastSeanse: new Date()
                        })
                        await newUser.save()

                        const token = jwtTokenGenerator(newUser._id, newUser.email, newUser.name)
                        res.status(200).send({userData: newUser,
                        token
                        })
                    }
        
                } catch (error) {
                    console.error(error)
                }
            }


            async loginUser(req: Request, res: Response) {
                const userData = req.body
        
                try {
                    const user: UserInterface | null = await User.findOne({email: userData.email.trim()})
        
                    if(user) {

                        if(user.blocked === true) {
                            res.status(500).send({
                                message: 'User has been blocked'
                            })
                        }

                        const isPassword = bcrypt.compareSync(userData.password.trim(), user.password)
        
                        if(isPassword) {
                            const token = jwtTokenGenerator(user._id, user.email, user.name)
                           user.set({
                            lastSeanse: new Date()
                            })
                        await user.save()
                            res.status(200).send({
                            userData: user,
                            token
                            })
        
                        } else {
                            
        
                            res.status(500).send({
                                message: 'Invalid credentials'
                            })
                        }
        
                    } else {
                        res.status(500).send({
                            message: 'User does not exist'
                        })
                    }
        
                } catch (error) {
                    console.error(error)
                }
        }

        async blockUser(req: Request | any, res: Response) {
            const {id} = req.params
            try {
                
                const isUserBlocked = await User.findById(req.userId)
                if(isUserBlocked.blocked === true) {
                    res.status(500).send({
                        message: 'User has been blocked'
                    })
                }

                const changStatus = await User.findById(id)
                // const user = await User.findByIdAndUpdate(id, {blocked: true})
                changStatus.set({
                    blocked: !changStatus.blocked
                })
                await changStatus.save()
    
                res.send({
                    user: changStatus,
                    message: 'User has been bloked'})
    
            } catch (error) {
                
            }
        }
        async activeUser(req: Request | any, res: Response) {
            const {id} = req.params

            try {

                const isUserBlocked = await User.findById(req.userId)
                if(isUserBlocked.blocked === true) {
                    res.status(500).send({
                        message: 'User has been blocked'
                    })
                } else {
                    const changStatus = await User.findById(id)
                    // const user = await User.findByIdAndUpdate(id, {blocked: true})
                    changStatus.set({
                        blocked: false
                    })
                    await changStatus.save()
        
                    res.send({
                        user: changStatus,
                        message: 'You have been blocked so You do not have an acces to Admin Dashboars'})
                }

                
    
            } catch (error) {
                
            }
        }

        async blockAllUsers(req: Request | any, res: Response) {
            const {id} = req.params
            try {

                const isUserBlocked = await User.findById(req.userId)
                if(isUserBlocked.blocked === true) {
                    res.status(500).send({
                        message: 'You have been blocked so You do not have an acces to Admin Dashboars'
                    })
                } else {
                    const changStatus = await User.findById(id)
                    // const user = await User.findByIdAndUpdate(id, {blocked: true})
                    changStatus.set({
                        blocked: true
                    })
                    await changStatus.save()
        
                    res.send({
                        user: changStatus,
                        message: 'User has been bloked'})
                }
               
    
            } catch (error) {
                
            }
        }


        async allUsers(req: Request, res: Response) {
            try {
                const users = await User.find()

                res.send({users})
            } catch (error) {
                console.log(error)
            }
        }

        async deleteUser(req: Request | any, res: Response) {
            const {id} = req.params
            try {

                const isUserBlocked = await User.findById(req.userId)
                if(isUserBlocked.blocked === true) {
                    res.status(500).send({
                        message: 'You have been blocked so You do not have an acces to Admin Dashboars'
                    })
                } else {
                    const deletedUser = await User.findByIdAndDelete(id)
                    res.send({
                        user: deletedUser,
                        message: 'User has been bloked'})
                }
                
    
            } catch (error) {
                
            }
        }
}

export default new UserControllers()