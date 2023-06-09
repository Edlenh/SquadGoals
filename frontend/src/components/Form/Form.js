import { useState } from "react";
import { useGoalContext } from "../../hooks/userGoal";
import { useAuthContext } from "../../hooks/userAuthContext";
import './Form.styles.css'
import MotivationalQuote from "../Quote/Quote";

const Form = ()=>{
    const {dispatch} = useGoalContext()
    const {user} = useAuthContext()
    const [title, setTitle]= useState('')
    const [finishOn, setFinishOn] = useState('');
    const [progress, setProgress] = useState('')
    const [error, setError] = useState(null)
    
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!user){
            setError('Must Be Logged In!')
            return
        }
    const goal = { title, finishOn, progress };
    const response = await fetch('/api/goal', {
        
        method: 'POST',
        body: JSON.stringify(goal),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()
    if(!response.ok){
        console.log('All fields required')
        setError('All Fields Required')
    }
    if(response.ok){
        setTitle('')
        setFinishOn('')
        setError(null)
        console.log('New Goal Started', json)
        dispatch({type:'CREATE_GOAL', payload: json})
    }
    }
    return(
        //creating a new goal
        <div className="create-form">
        <form className="create" onSubmit={handleSubmit}>
            <h3 className="create-title">Start a New Goal</h3>
            <input
            placeholder="Title"
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />
            <label className="create-title">Finish Date: </label>
            <input
            type="date"
            onChange={(e)=>setFinishOn(e.target.value)}
            value={finishOn}
            />
            <label className="create-title">Current Progress %: </label>
            <input
            placeholder="Set Progress %"
            type="number"
            onChange={(e)=>setProgress(e.target.value)}
            value={progress}
            />
            <button className="addgoal-button">Add Goal</button>
            {error && <div className="error">{error}</div>}
            <h1 className="home-footer">Today's Motivation</h1>
            <div className="home-tag">
            <p ><MotivationalQuote /></p> 
            </div>
        </form>
        </div>
        
    )
}

export default Form