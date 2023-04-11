import { useState } from "react"
import { useLogin } from "../hooks/userLogin";


const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, loading} = useLogin()

    const submitHandler = async (e)=>{
        e.preventDefault()
       await login(email,password)
    }
    return (
        <div className="login-wrapper">
        <div className="login-bg">
        <form className ="login" onSubmit={submitHandler}>
            <h2 className="login-main">Log In</h2>
            {/* <label>Email</label> */}
            <input
            placeholder="Email"
            type = "email"
            autoComplete= "off"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
            {/* <label>Password</label> */}
            <input
            placeholder="Password"
            type ="password"
            autoComplete= "off"
            onChange={(e)=> setPassword(e.target.value)}
            value={password} 
            />
            <button disabled={loading}>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
        <footer className="form-footer">
        <div className="form-footer-container">
        <h1 className="form-foot">SQUAD <br></br> GOALS</h1>
        <p className="form-p">Welcome Back!</p> 
        </div>
        </footer>
        </div>

    )
};
export default Login

