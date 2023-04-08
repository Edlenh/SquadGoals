import { useState } from "react";
import { useAuthContext } from "./userAuthContext";

export const useLogin = ()=>{
    const [error, setError]= useState(null)
    const [loading, setLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password, userId)=>{
        setLoading(true)
        setError(null)

        const response = await fetch('/api/user/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        console.log("user logged in", email, userId)
        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: {...json, _id: userId}})
            setLoading(false)
        }
    }
    return{login, loading, error}
}