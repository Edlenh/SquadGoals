import { useGoalContext } from "../hooks/userGoal";
import { useState } from "react";
import { useAuthContext } from "../hooks/userAuthContext";

const Board = ({goal})=>{
    const {dispatch} = useGoalContext()
    const {user} = useAuthContext()
    const [editing, setEditing] = useState(false)
    const [boardData, setBoardData] = useState({
        title: goal.title,
        finishOn: goal.finishOn,
    })

    const deleteClick = async ()=>{
        if(!user){
            return
        }
        const response = await fetch('/api/goal' + goal._id,{
            method: 'DELETE',
            headers:{
                'Authorization' :`Bearer${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_GOAL', payload: json})
        }
    }
    const updateClick =()=>{
        setEditing(true)
    };
    const cancelClick =()=>{
        setEditing(false)
    };
    const handleChange =(e)=>{
        setBoardData({...boardData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch('/api/goal/' + goal._id, {
            method: 'PUT',
            body: JSON.stringify(boardData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = response.json();
        if(response.ok){
            setEditing(false);
            dispatch({type: 'UPDATE_WORKOUT', payload: json});
        }
    };

    if(editing){
        return(
            <form onSubmit={handleSubmit}>
                <h3>Edit Goal</h3>
                <label>Goal:</label>
                <input
                type="text"
                name="title"
                value={boardData.title}
                onChange={handleChange} 
                />
                <label>Finish On:</label>
                <input
                type="text"
                name="finishOn"
                value={boardData.finishOn}
                onChange={handleChange} 
                />
            <button type="submit">Save</button>
            <button type="button" onClick={cancelClick}>Cancel</button>
            </form>
        )
    }

    return(
        <div className="goal-details">
            <h4>{goal.title}</h4>
            <p><strong>Finsh On: {goal.finishOn}</strong></p>
            <h2 onClick={deleteClick}>delete</h2>
            <h2 onClick={updateClick}>update</h2>
        </div>
    )
}

export default Board