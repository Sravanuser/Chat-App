import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
    return (
        <div className='search'>
            <input type='text' className='search1' />
            <CiSearch size={30}/>
        </div>
    )
}
