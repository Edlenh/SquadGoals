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
    return(<div>
        <form className ="signup" onSubmit={submitHandler}>
        <h2>Sign Up</h2>
        <label>Email:</label>
        <input
        type = "email"
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
        />
        <br></br>
         <label>Username:</label>
        <input
        type ="text"
        onChange={(e)=> setUsername(e.target.value)}
        value={username} 
        />
        <br></br>
        <label>Password:</label>
        <input
        type ="password"
        onChange={(e)=> setPassword(e.target.value)}
        value={password} 
        />
        <button disabled={loading}>Submit</button>
        {error && <div className="error">{error}</div>}
    </form>
        <section className="form-section">
        <h1 className="form-foot">SQUAD GOALS</h1>
        <div className="ptag">
            <div className="pshadow"><small>
                Getting it done, together</small></div>
        </div>
        </section>
   
    </div>
)
};


export default SignUp