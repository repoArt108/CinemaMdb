import React, { Children, createContext, useState } from 'react'

export let box =createContext(0)

export default function Context({children}) {
    let [searchQuery, setSearchQuery] = useState('');
    let show = searchQuery ? "search" : "discover";
    
    
    
      const handleChange = (e) => {
        setSearchQuery(e.target.value)
      }
    return (
  <box.Provider value ={{searchQuery,setSearchQuery,show,handleChange}}>
    {children}
  </box.Provider>
  )
}
