import { useEffect } from "react"
import {useAuthContext} from '../hooks/userAuthContext'

const Home =()=>{
    const {user} = useAuthContext()
    useEffect(()=>{

    },[user])
    return(
        <h1>Hey this is home</h1>
    )
}

export default Home