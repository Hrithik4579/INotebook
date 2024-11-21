import {React,useState} from "react";

import {useNavigate} from "react-router-dom";
const Signup = (props) => {
    const [credentials,setCredentials]=useState({name: "",email: "",password: "",cpassword: ""});
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://i-notebook-e3zg.vercel.app/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email,password:credentials.password}),
        })
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',JSON.stringify(json.authToken));
            navigate('/');
            props.showAlert("Account Created Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
}
const handleChange=(e)=>{
    e.preventDefault();
    setCredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    <div>
        <h2 className="my-3">Sign Up to continue to INotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
          />
          </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            minLength={5} 
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword mb-3">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Password"
            name="cpassword"
            minLength={5}
            required
            onChange={handleChange}
          />
        </div>
        <div className="my-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
