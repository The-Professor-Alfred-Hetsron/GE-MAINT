import React, {useState, useEffect} from 'react'
import { BsSearch } from "react-icons/bs";

function InputSearchField(props) {
    const [searchValue, setSearchValue] = useState("")

    useEffect(()=> {
        props.setNewSearchValue(searchValue)
    },[searchValue, props])
    
  return (
    <div className="w-full h-full p-2 bg-stone-50 rounded-xl border border-slate-300 flex flex-row justify-start items-center gap-2">
        <input type="search" name="" id="" className="w-full bg-stone-50 focus:outline-none" onChange={(e)=> setSearchValue(e.target.value)} placeholder={props.placeholder}/>
        <BsSearch/>
    </div>
  )
}

export default InputSearchField