import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserActionTypes } from '../../store/types/user.types';


const Navbar = () => {

    const info = localStorage.getItem('userTask')
    const user = info !== null ? JSON.parse(info) : ''
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({type: UserActionTypes.LOGOUT})
        navigate('/auth')
    }

    useEffect(() => {
      if(!user) {
        navigate('/auth')
      }
    }, [location])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">Task 3</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li id='1' className="nav-item">
        <a className="nav-link" href="https://github.com/Ivan1vanov/TASK_3"
        target="_blank" 
        >Source code</a>
      </li>
    </ul>
    {user && (
        <div style={{margin: '0 auto'}}>
        Hello, <strong> {user?.userData?.name}!</strong>
        </div>
    )}

    {user?.token ? (
           <Button variant='danger' onClick={logoutHandler}>
           Log out
       </Button>
    ): ( 
       <span className="navbar-text">
        <Link to='/auth'>Log in</Link>
      </span>
    )}
  </div>
</nav>
    </div>
  )
}

export default Navbar