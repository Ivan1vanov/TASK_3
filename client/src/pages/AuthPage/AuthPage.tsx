import React, { useEffect, useState } from 'react'
import validator from 'validator'

import { Form, Button, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './auth.module.scss'

import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { UserInputData, IUser, LoginedUser } from '../../store/types/user.types';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction, registrationAction } from '../../store/action/userActions';




const AuthPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [isHidenPassword, setIsHidenPassword] = useState<boolean>(true)
    const [validationError, setValidationError] = useState<string>('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const {error, auth} = useSelector((state: any) => state.users)
    const [userData, setUserData] = useState<UserInputData>({
        name: '',
        email: '',
        password: ''
    })

    const {name, email, password} = userData

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (): void => {
    if(validator.isEmail(email)) {
        setValidationError('')
        if(isLogin) {
            dispatch(loginUserAction(userData))
        } else {
            dispatch(registrationAction(userData)) 
        }
    } else {
        setValidationError('Invalid email')
    }   
    }

    const info = localStorage.getItem('userTask')
    const user = info !== null ? JSON.parse(info) : ''

    useEffect(() => {
        if(user?.token) {
            navigate('/')
        }
    }, [user, location])


  return (
    <Container className={styles.container}>
        <h1>
            {isLogin ? <span>Login</span> : <span>Register</span>}
        </h1>
        {isLogin ? (
            <Form className={styles.authContainer}>
           <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' onChange={onChangeHandler} placeholder="name@example.com" />
        We'll never share your email with anyone else.
        </Form.Group>
          

        <div className={styles.passwordWraper}>
        <Form.Group  style={{width: '100%'}} className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type={isHidenPassword ? "password" : "text"} name='password' onChange={onChangeHandler} style={{width: '100%'}} placeholder="Enter password" />
        </Form.Group>
        <div className={styles.allSeeingEye} onClick={() => setIsHidenPassword(!isHidenPassword)}>
               {isHidenPassword ? (   
             <BsFillEyeSlashFill style={{fontSize: '25px'}} />
               ) : (
            <BsFillEyeFill style={{fontSize: '25px'}}/>
               )}
         
           </div>
        </div>
        </Form>
        ) :  (
            <Form className={styles.authContainer}>
            <Form.Group className="mb-3">
         <Form.Label>Email address</Form.Label>
         <Form.Control  type="email" name='email' onChange={onChangeHandler} placeholder="name@example.com" />
         We'll never share your email with anyone else.
         </Form.Group>
           
         <Form.Group className="mb-3" >
         <Form.Label >Your name</Form.Label>
         <Form.Control  type="text" name='name' onChange={onChangeHandler} placeholder="Name" />
         </Form.Group>
 
         <div className={styles.passwordWraper}>
         <Form.Group  style={{width: '100%'}} className="mb-3" >
         <Form.Label>Password</Form.Label>
         <Form.Control  type={isHidenPassword ? "password" : "text"} name='password' onChange={onChangeHandler} style={{width: '100%'}} placeholder="Enter password" />
         </Form.Group>
         <div className={styles.allSeeingEye} onClick={() => setIsHidenPassword(!isHidenPassword)}>
                {isHidenPassword ? (   
              <BsFillEyeSlashFill style={{fontSize: '25px'}} />
                ) : (
             <BsFillEyeFill style={{fontSize: '25px'}}/>
                )}
          
            </div>
         </div>
         </Form>
        )
    }
    {error && (
        <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )}
    {validationError && (
        <div className="alert alert-danger" role="alert">
        {validationError}
      </div>
    )}
        <Button onClick={onSubmitHandler}>
        {isLogin ? <span>Login</span> : <span>Register</span>}
        </Button>
    <div>
        {isLogin ? (
            <span>Do not have an account? - <Button variant='outlined' onClick={() => setIsLogin(false)}>Register</Button></span>
        ) : (
            <span>
            <span>Allready have an account? - <Button variant='outlined' onClick={() => setIsLogin(true)}>Log in</Button></span>
            </span>
        )}
    </div>
    </Container>
  )
}

export default AuthPage