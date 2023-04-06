import { useState } from "react";
import { useSignUp} from "../hooks/userSignup";

const SignUp = ()=>{
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, loading} =useSignUp()

    const submitHandler = async(e)=>{
        e.preventDefault()
        await signup(email, username, password)
    }   
    return(
        <form className ="signup" onSubmit={submitHandler}>
        <h2>Sign Up</h2>
        <label>Email:</label>
        <input
        type = "email"
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
        />
         <label>Username:</label>
        <input
        type ="text"
        onChange={(e)=> setUsername(e.target.value)}
        value={username} 
        />
        <label>Password:</label>
        <input
        type ="password"
        onChange={(e)=> setPassword(e.target.value)}
        value={password} 
        />
        <button disabled={loading}>Submit</button>
        {error && <div className="error">{error}</div>}
    </form>
)
};


export default SignUp