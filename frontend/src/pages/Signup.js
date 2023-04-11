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
        <div className="signup-wrapper">
        <div className="signup-bg">
        <form className ="signup" onSubmit={submitHandler}>
        <h2 className="signup-main">Sign Up</h2>
        {/* <label>Email</label> */}
        <input
        placeholder="Email"
        type = "email"
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
        />
        <br></br>
         {/* <label>Username</label> */}
        <input
        placeholder="Username"
        type ="text"
        onChange={(e)=> setUsername(e.target.value)}
        value={username} 
        />
        <br></br>
        {/* <label>Password</label> */}
        <input
        placeholder="Password"
        type ="password"
        onChange={(e)=> setPassword(e.target.value)}
        value={password} 
        />
        <button disabled={loading}>SUBMIT</button>
        {error && <div className="error">{error}</div>}
    </form>
        </div>
        <section className="form-section">
        <div className="form-footer-container">
        <h1 className="form-foot">SQUAD <br></br> GOALS</h1>
        <div className="ptag">
            <div className="pshadow"><small>
                Get it done, together</small></div>
                </div>
        </div>
        </section>
    </div>
    </div>
)
};


export default SignUp