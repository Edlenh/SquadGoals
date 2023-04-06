import { AuthContext } from "../context/authContext";
import { useContext } from "react";

//manage state on a global level
export const useAuthContext =()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw Error('bad user context')
    }
    return context
}