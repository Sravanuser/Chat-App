import React from 'react'
import { useState,useEffect } from 'react'

export default function useGetusers() {
  const [loading,setloading] = useState(false);
  const [user,setuser] = useState([]);
    useEffect(()=>{
        setloading(true);
        const getUsers = async() => {
            const res = await fetch(`/user`,{
                method: 'GET',
                credentials: 'include'
            });
            const result = await res.json();
            setuser(result.users);
            setloading(false);
        }
        getUsers();
    },[])
    return {loading,user}
}
