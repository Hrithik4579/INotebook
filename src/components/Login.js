import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
const Login = (props) => {
    const [credentials,setCredentials]=useState({email: "",password: ""});
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://i-notebook-e3zg.vercel.app/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email,password:credentials.password}),
        })
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',JSON.stringify(json.authToken));
            props.showAlert("Logged in Successfully","success")
            navigate('/');
            
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
}
const handleChange=(e)=>{
    e.preventDefault();
    setCredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    <div>
        <h2 className="my-3">Login to INotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3 my-4">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
