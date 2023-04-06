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
        <form className ="login" onSubmit={submitHandler}>
            <h2>Log In</h2>
            <label>Email:</label>
            <input
            type = "email"
            autoComplete= "off"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
            <label>Password:</label>
            <input
            type ="password"
            autoComplete= "off"
            onChange={(e)=> setPassword(e.target.value)}
            value={password} 
            />
            <button disabled={loading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
};
export default Login

