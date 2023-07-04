import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
const Addnote = (props) => {
    const [note,setNote]=useState({title: "",description: "",tag: ""})
    const context=useContext(noteContext);
    const {addNote}=context;
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Noted Added","success")
    }
    const handleChange=(e)=>{
        e.preventDefault();
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
       <div className="container">
        <h2>Add A Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name= "title"
              onChange={handleChange}
              minLength={5}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleChange}
              minLength={5}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleChange}
              value={note.tag}
            />
          </div>
          {/* <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}> */}
          <button disabled={note.title.length<5||note.description.length<5} type="button" className="btn btn-dark" onClick={handleClick}>Add Note</button>
          
          {/* </button> */}
        </form>
      </div>
    </div>
  )
}

export default Addnote
