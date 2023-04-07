import { useEffect } from "react"
import {useAuthContext} from '../hooks/userAuthContext'
import { useGoalContext } from "../hooks/userGoal"

import Board from "../components/Board"
import Form from "../components/Form"

const Home =()=>{
    const {goals, dispatch} = useGoalContext()
    const {user} = useAuthContext()
    useEffect(()=>{
        const fetchGoals = async()=>{
            const response = await fetch('/api/goal',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.json){
                dispatch({type: 'SET_GOALS', payload: json})
            }
        }

        if(user){
            fetchGoals()
        }
    },[dispatch, user])
    return(
        <div className="home">
        <div className="goals">
    
        {goals && goals.map((goal)=>(
            <Board key={goal._id} goal={goal}/>
        ))}
        </div>
        <Form />
        </div>
    )
}

export default Home