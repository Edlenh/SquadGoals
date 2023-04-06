import { GoalContext } from "../context/goalContext";
import { useContext } from "react";

//manage goal context on a global level. 
export const useGoalContext = ()=>{
    const context = useContext(GoalContext)
    if(!context){
        throw Error('invalid goal context')
    }
    return context
}