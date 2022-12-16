// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const {closeModal } = useModal();
  const history=useHistory()

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(closeModal)
  //     .then(history.push("/"))
  //     .catch(
  //       async (res) => {
  //         const data = await res.json();
  //         if (data && data.errors) setErrors(data.errors);
  //       }
  //     );
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const temperror=[]
    dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .then(history.push("/"))
      .catch((err)=>{
         temperror.push("Error, Lets try again")
        setErrors(temperror)
        return
      }
      );
 
  };




  const demoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.demoUserlogin())
      .then(closeModal)
      .then(history.push("/"))
      .catch(
        async (res) => {
          
          const data = await res.json();
          console.log(data)
          if (data && data.errors) setErrors(data.errors);
        }
      );

  };


  return (
    <div className="loginload">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='loginform'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username</label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        
        <label>
          Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        
        <button type="submit" className="buttons login">Log In</button>
      </form>
      <form onSubmit={demoSubmit} className='loginform'>
        <button type="submit" className="buttons login">DemoUserLogin</button>
        </form>
    </div>
  );
}

export default LoginFormModal;