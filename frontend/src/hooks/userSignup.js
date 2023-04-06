import {useState} from 'react'
import {useAuthContext} from './userAuthContext'

export const useSignUp = ()=>{
    const [error,setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async(email,username,password)=>{
        setLoading(true)
        setError(null)
    

        const response = await fetch('/api/user/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, username, password})
        })
        console.log(response)
        const json = await response.json()

    if(!response.ok){
        setLoading(false)
        setError(json.error)

    }
    if(response.ok){
        localStorage.setItem('user', JSON.stringify(json))
        //if sign up is successful have the user login afterwards
        dispatch({type: 'LOGIN', payload: json})
        setLoading(false)
    }
}
return {signup, loading, error}
}