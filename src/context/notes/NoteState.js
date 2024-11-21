import React from 'react'
import NoteContext from './NoteContext'
import { useState } from 'react'
const NoteState=(props)=> {
    const host="http://i-notebook-e3zg.vercel.app";
    const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial);
    //Fetching Notes
    const getNotes=async ()=>{
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": JSON.parse(localStorage.getItem('token'))
            },
            // body: JSON.stringify(title,description,tag), 
          });
          const json = await response.json();
          setNotes(json);
    }
    //Adding notes
    const addNote=async (title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({title,description,tag}), 
          });
          const note=await response.json(); 
       
          setNotes(notes.concat(note));
    }
    //Deleting notes
    const deleteNote=async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": JSON.parse(localStorage.getItem('token'))
            }
          });
          const json=response.json();
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }
    //Updating notes
    const editNote=async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({title,description,tag}), 

          });
          const json=await response.json(); 
          let newnotes=JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if(element._id===id){
                newnotes[index].title=title;
                newnotes[index].description=description;
                newnotes[index].tag=tag;
                break;
            }
        }
        setNotes(newnotes);
    }
    
  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
