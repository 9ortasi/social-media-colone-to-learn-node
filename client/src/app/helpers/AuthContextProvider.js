"use client"
import axios from "axios";
import { createContext,useContext,useEffect,useState } from "react";

export const AuthContext=createContext("")
export const AuthContextProvider=({children})=>{
    const [authState, setAuthState] = useState({username:"",id:0,status:false,loading:true})
    useEffect(()=>{
        axios.get("http://localhost:3001/auth/validToken",{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        }).then((response)=>{
            console.log(response.data)
            if(!response.data.error) {setAuthState({username:response.data.username,id:response.data.id,status:true,loading:false})}
            else{setAuthState({username:"",id:0,status:false,loading:false}) }
        }

    )
    },[])
    return(
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>{
    return useContext(AuthContext)
}