import React from 'react'
import { IUser } from '../../store/types/user.types';
import moment from 'moment'


interface IUserProp {
    user: IUser,
    lp?: number
}

const UserTable: React.FC<IUserProp> = ({user}) => {

  return (
      <React.Fragment>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{moment(user.lastSeanse).fromNow()}</td>
      <td>{user.blocked ?<span className="alert alert-danger" >BLOKED</span> :  <span className="alert alert-success">ACTIVE </span>}</td>
  </React.Fragment>
  )
}

export default UserTable