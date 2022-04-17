import React from 'react'
import { IUser } from '../../store/types/user.types';
import moment from 'moment'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeUserStatusAction } from '../../store/action/userActions';
import { useNavigate } from 'react-router-dom';

interface IUserProp {
    user: IUser,
    lp?: number
}

const UserTable: React.FC<IUserProp> = ({user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeUserStatusHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(changeUserStatusAction(user._id, navigate))
    }

  

  return (
      <React.Fragment>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{moment(user.lastSeanse).fromNow()}</td>
      <td>{user.blocked ?<span className="alert alert-danger" >BLOKED</span> :  <span className="alert alert-success">ACTIVE </span>}</td>
      <td>
      <Button variant={user.blocked ? 'success' : 'danger'} onClick={changeUserStatusHandler}>
          {user.blocked ? (
            
            <span>ACTIVE</span>
           
          ) : ( 
           
            <span>BLOCKE</span>
         
          )}
          </Button>
          
      </td>
  </React.Fragment>
  )
}

export default UserTable