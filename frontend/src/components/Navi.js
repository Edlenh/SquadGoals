import {Link } from 'react-router-dom'
// import { useLogout } from '../hooks/userLogOut'
import { useAuthContext } from '../hooks/userAuthContext'

const Nav =  ()=>{
    // const {logout} = useLogout()
    const {user } = useAuthContext()
    // const logoutClick =()=>{
    //     logout()
    // }
    return(
        <header>
            <div className="container">
            <Link to="/">
                <h1>Squad Goals</h1>
            </Link>
            <nav>
                { user && (
                <div>
                    <span>{user.username}</span>
                    {/* <button onClick={logoutClick}>Log Out</button> */}
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