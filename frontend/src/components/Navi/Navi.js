import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../../hooks/userLogOut'
import { useAuthContext } from '../../hooks/userAuthContext'
import './Navi.style.css'


const Nav =  ()=>{
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const location = useLocation()
    // console.log(user)
    const logoutClick =()=>{
        logout()
    }
    return(
        <header>
            <div className="container">
            {user ? (
        <Link to="/">
            <span className='account-circle' class="material-symbols-outlined">account_circle</span>
        </Link>
    ) : (
        <span className='app-name'>SquadGoals</span>
    )}
            <nav>
                { user && (
                <div className='navii'>
                   
                    {location.pathname !== '/feed' && ( 
                                <Link to="/feed">Friends</Link>
                            )}
                            {location.pathname !== '/' && ( 
                                <Link to="/">Home</Link>
                            )}
                   
                    <button className='nav-button' onClick={ logoutClick }>Log Out</button>

                </div>
                )}
                {!user && (
                    <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div> 
                )}
            </nav>
            </div>
        </header>
    )
}

export default Nav