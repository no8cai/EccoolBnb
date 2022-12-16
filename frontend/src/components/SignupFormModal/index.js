import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();



  useEffect(() => {

    if (!email&&!username&&!firstName&&!lastName&&!password) {
      setErrors([]);
      return;
    }

    const temperrors =[];

    if(email.length<=0){temperrors.push("Email field is required");}
    else if(!email.includes("@")) {temperrors.push("Please provide a valid Email");}
    if(username.length<=0){temperrors.push("Username field is required");}
    if(firstName.length<=0){temperrors.push("First name field is required");}
    if(lastName.length<=0){temperrors.push("Last name is required");}
    if(password.length<=0){temperrors.push("Password is required");}
    if (password !== confirmPassword){temperrors.push("Confirm Password field must be the same as the Password field");}
    setErrors(temperrors);

  }, [email,username,firstName,lastName,password,confirmPassword]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length) return alert(`Cannot Submit`);

      setErrors([]);

      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });

    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signupcompo">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className='signupform'>
           <div className='reviewform-errorsec'>
                  <div className='reviewform-title'>
                  <i className="fa-solid fa-circle-exclamation ertlbu" />
                  <h4>Please try again</h4>
                  </div>
                  {!!errors.length && (
                  <div className='reviewform-errortop'>
                  <ul className='reviewform-errors'>
                      {errors.map((error) => (
                      <div key={error}>{error}</div>
                       ))}
                  </ul>
                  </div>
                   )}
          </div>
        <label>
          Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        
        <label>
          Username </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
       
        <label>
          First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        
        <label>
          Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        
        <label>
          Password  </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
  
        <label>
          Confirm Password  </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
      
        <button type="submit" className="buttons signupbt">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;