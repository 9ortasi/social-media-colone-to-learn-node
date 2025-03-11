"use client"
import React, { useEffect } from 'react'
import Link from "next/link";
import { AuthContext } from '../../helpers/AuthContextProvider';
import { useState } from 'react';
import { useAuth } from '../../helpers/AuthContextProvider';
import "./style.css"
import { useRouter } from "next/navigation";
function Navbar() {
    const { authState, setAuthState } = useAuth();
    const router=useRouter()
    
    const logout = () => {
        router.push("/login")
        localStorage.removeItem('accessToken');
        setAuthState({ username: "", id: 0, status: false, loading:false})
       
    }
    //useEffect(()=>{console.log("authstate triggered")},[authState])
    return (
        <ul className="navbar">
            
            {!authState.status ? (
                <>
                    <li ><Link  className='navItem' href="/login">Login</Link></li>
                    <li ><Link  className='navItem' href="/registration">Registration</Link></li>

                </>
            ) :
                <>
                    <li><Link className='navItem' href="/createPost">create a post</Link></li>
                    <li ><Link  className='navItem' href="/">Home</Link></li>
                    <li className="navItem username">{authState.username}</li>
                    <li>
                        <button className=" logout-button" onClick={logout}>Logout</button>
                    </li>
                </>}
        </ul>
    )
}

export default Navbar
