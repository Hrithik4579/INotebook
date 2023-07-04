import React from 'react'
import { useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'
const About = () => {
    
    
  return (
    <div>
      <h2 className="container">About INotebook</h2>
      <p>INotebook can be used for:
      </p>
      <ul>
        <li>Making personal or professionl notes</li>
        <li>Storing Notes on the cloud server for anytime and easy access</li>
        <li>Can maintain privacy and secure your notes</li>
        <li>Edit or delete notes anytime</li>
        <li>Give your notes a relevant tag</li>
      </ul>
    </div>
  )
}

export default About
