import { createContext, useReducer } from "react";

//this will be passed to a goal hook to be used globally
export const GoalContext = createContext()

export const goalReducer =(state, action)=>{
    switch(action.type){
        case 'SET_GOALS':
        return{
            goals: action.payload
        }
        case 'CREATE_GOAL':
            return{
                goals: [action.payload, ...state.goals]
            }
        case 'DELETE_GOAL':
            return{
                goals: state.goals.filter((g)=>g._id!== action.payload._id)
            }
        case 'UPDATE_GOAL':
            return{
                goals: state.goals.map((goal)=>
                goal._id === action.payload._id ? 
                action.payload : goal)}
        case 'SET_FRIEND_GOALS':
            return {
        friendGoals: action.payload
      }
        default:
            return state
            }
     }

     export const GoalContextProvider =({children})=>{
        const[state, dispatch] = useReducer(goalReducer, {
            goals: null
        })

        return(
            <GoalContext.Provider value={{...state, dispatch}}>
                {children}
            </GoalContext.Provider>
        )
     }
