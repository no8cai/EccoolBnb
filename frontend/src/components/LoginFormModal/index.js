// frontend/src/components/LoginFormModal/index.js
import React, { useState,useEffect } from "react";
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
   

  useEffect(() => {
    if (!credential&&!password) {
      setErrors([]);
      return;
    }
    const temperrors =[];
    if(credential.length<=0){temperrors.push("credential is required");}
    if(password.length<=0){temperrors.push("password is required");}

    setErrors(temperrors);

  }, [credential,password]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const temperror=[]
    dispatch(sessionActions.login({ credential, password }))
      .then(()=>{closeModal()})
      .then(()=>{history.push("/")})
      .catch(async (err)=>{
        const errobj=await err.json();
        temperror.push(errobj.message)
        setErrors(temperror)
      });
 
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
          if (data && data.errors) setErrors(data.errors);
        }
      );

  };


  return (
    <div className="login-section">
      <h3 className="login-title">Welcom back</h3>
      <div className="loginload">
      <div className="login-icon"><i className="fas fa-user-circle" /></div>
      <form onSubmit={handleSubmit} className='loginform'>

      {!!errors.length && 
        <div className="login-errorload">
        <div className="login-erroricon"><i className="fa-solid fa-circle-exclamation" /></div>
        <div className="login-errorinfo">
        <div className="login-errortile">Let's try that again</div>
        <div>
          {errors.map((error, idx) => (
            <div key={idx} className="login-errortext">{error}</div>
          ))}
        </div>
        </div>
        </div>
        }
        
        <div className="login-infomation">
        <div className="username">
        <label className="login-text">
          Username</label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <label className="login-text">
          Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="buttons login">Log In</button>
      </form>
      <form onSubmit={demoSubmit} className='loginform'>
        <button type="submit" className="buttons login">DemoUserLogin</button>
        </form>
        </div>
    </div>
  );
}

export default LoginFormModal;