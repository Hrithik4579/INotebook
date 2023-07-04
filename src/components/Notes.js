import React, { useState,useContext, useEffect, useRef } from 'react'
import notescontext from '../context/notes/NoteContext';
import Noteitem from './Noteitem'; 
import Addnote from './Addnote';
import { useNavigate, useNavigation } from 'react-router-dom';
const Notes = (props) => {
    let navigate=useNavigate();
    const [note,setNote]=useState({id: "",etitle: "",edescription: "",etag: "Default"})
    const refClose=useRef(null);
    const ref=useRef(null);
    const context=useContext(notescontext);
    const {notes,getNotes,editNote}=context;
    const updateNote=(currentnote)=>{
        ref.current.click();
        setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }
    const handleClick=(e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully","success");
    }
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
        getNotes();  
        }else{
            navigate('/login');
        }
    
    },[])
  return (
    <>
    <div className='container my-3'></div>'
    <Addnote showAlert={props.showAlert}/>
   
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name= "etitle"
              value={note.etitle}
              onChange={handleChange}
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edesription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              value={note.edescription}
              onChange={handleChange}
              minLength={5}

            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              value={note.etag}
              onChange={handleChange}
            />
          </div>
          </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5||note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div>
       <div className="row my-4">
        <h2>Your Notes</h2>
        <div className="container mx-2">
            {notes.length===0&&"No notes to display"}
        </div>
        {notes.map((note)=>{
             return <Noteitem showAlert={props.showAlert} note={note} updateNote={updateNote} key={note._id}/>;
        })}
      </div>
    </div>
    </>
  )
}

export default Notes
