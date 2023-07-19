

import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { useState, createContext } from 'react'
import './App.css'

import Homepage from './app/pages/Homepage'
import Roomspage from './app/pages/Roomspage'
import Roompage from './app/pages/Roompage'
import Groupspage from './app/pages/Groupspage'
import Grouppage from './app/pages/Grouppage'
import { items } from './app/words/allItems'
import { words } from './app/words/allWords'
import { groups } from './app/words/allGroups'



function App() {
  const { roomNum, chosenGroup } = useParams()
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/rooms" element={<Roomspage />} />
        <Route path="/rooms/:roomNum" element={<Roompage /> } />
        <Route path="/groups" element={<Groupspage />} />
        <Route path="/groups/:chosenGroup" element={<Grouppage />} />
      </Routes>
    </BrowserRouter>
  ) 
}

export const Context = createContext()


function ContextP () {
  const allItems = items
  //for dictionary, similarwordsFinding
  const allWords = words
  //for lab groups
  const allGroups  = groups
  
  
  return <Context.Provider value={{
    allItems,
    allWords,
    allGroups,
    
    
  }}>
    <div class="mt-8">
      <App/>
    </div>
  </Context.Provider>
}

export default ContextP
