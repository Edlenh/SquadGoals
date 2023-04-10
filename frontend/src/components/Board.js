import ProgressBar from 'react-bootstrap/ProgressBar';
import React from 'react';
import { useGoalContext } from "../hooks/userGoal";
import { useState } from "react";
import { useAuthContext } from "../hooks/userAuthContext";

const Board = ({goal})=>{
  
    const {dispatch} = useGoalContext()
    
    const {user} = useAuthContext()
    console.log(user)
    const [editing, setEditing] = useState(false)
    const [boardData, setBoardData] = useState({
        title: goal.title,
        finishOn: goal.finishOn,
        progress: goal.progress
    })

    const deleteClick = async ()=>{
        if(!user){
            return
        }
        const response = await fetch('/api/goal/' + goal._id,{
            method: 'DELETE',
            headers:{
                'Authorization' :`Bearer ${user.token}`
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
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${user.token}`
            }
        })
        const json = await response.json();
        console.log(json)
        if(!response.ok){
            console.log('update broken')
        }

        if(response.ok){
            setEditing(false);
            dispatch({type: 'UPDATE_GOAL', payload: json});
        }
    };

    //editing existing goals and current goals
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
                type="date"
                name="finishOn"
                value={boardData.finishOn}
                onChange={handleChange} 
                />
                <label>Progress</label>
                <input
                type="number"
                name="progress"
                value={boardData.progress}
                onChange={handleChange} 
                />
            <button type="submit">Save</button>
            <button type="button" onClick={cancelClick}>Cancel</button>
            </form>
        )
    }

    return(
        <div className="goal-details">
             <p><strong>Goal: {goal.title}</strong></p>
           
            <p><strong>Finish On: {goal.finishOn}</strong></p>
            <p><strong>Current Progress: {goal.progress}%</strong></p>
            
            <ProgressBar className="bar"now={goal.progress} label={`${goal.progress}%`}/>
            <h2 className="material-symbols-outlined"onClick={deleteClick}>delete</h2>
            <span className="material-symbols-outlined" onClick={updateClick}>edit</span>
        </div>
    )
}

export default Board