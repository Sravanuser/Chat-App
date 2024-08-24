import React from 'react'
import Users from "./User"
import "./Sidebar.css"
import SearchBar from "./SearchBar"
import useGetusers from '../../Hooks/AuthHooks/useGetusers'
import { FiLogOut } from "react-icons/fi"
import useLogout from '../../Hooks/AuthHooks/useLogout'

export default function Sidebar() {
  const { loading, user } = useGetusers();  
  const { logout }  = useLogout();
  return (
    <div className='sidebar'>
      <SearchBar />
      {
        !user ? null : user.map((item,idx)=>(
        <Users key={idx} id={item._id} item={item}/>
      ))
      }
      <FiLogOut size={30} className="logout" onClick={logout}/>
    </div>
  )
}
