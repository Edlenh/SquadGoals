import { useAuthContext } from "./userAuthContext";
import { useGoalContext } from "./userGoal";

export const useLogout = ()=>{
    const {dispatch} = useAuthContext()
    const {dispatch : goalDispatch} = useGoalContext()
    const logout = ()=>{
        localStorage.removeItem('user')

    dispatch({type: 'LOGOUT'})
    //when user logs out remove the goals on the page
    goalDispatch({type: 'SET_GOALS', payload: null})
    }
    return {logout}
}