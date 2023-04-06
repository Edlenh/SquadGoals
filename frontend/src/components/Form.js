import { useState } from "react";
import { useGoalContext } from "../hooks/userGoal";
import { useAuthContext } from "../hooks/userAuthContext";

const Form = ()=>{
    const {dispatch} = useGoalContext()
    const {user} = useAuthContext()
    const [title, setTitle]= useState('')
    const [finishOn, setFinishOn]=useState('')
    const [error, setError] = useState(null)
    // const [emptyFields, setEmptyFields]= useState([])
    

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!user){
            setError('Must Be Logged In!')
            return
        }
    const goal = {title, finishOn}
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
        setError(json.error)
        // setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setTitle('')
        setFinishOn('')
        setError(null)
        // setEmptyFields([])
        console.log('New Goal Started', json)
        dispatch({type:'CREATE_GOAL', payload: json})
    }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Start a New Goal</h3>
            <label>Goal: </label>
            <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
         
            // className={emptyFields.includes('title')?'error': ''}
            />
            <label>Finish Date: </label>
            <input
            type="text"
            onChange={(e)=>setFinishOn(e.target.value)}
            value={finishOn}
            // className={emptyFields.includes('finishOn')? 'error':''}
            />

            <button>Add Goal</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default Form