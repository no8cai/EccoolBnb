import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { useHistory } from "react-router-dom";

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
  const history=useHistory();


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
    if (password !== confirmPassword){temperrors.push("Confirm password field must be the same as the password field");}
    setErrors(temperrors);

  }, [email,username,firstName,lastName,password,confirmPassword]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length) return;

      setErrors([]);
      const temperror=[]
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
      .then(()=>{closeModal()})
      .then(()=>{history.push("/")})
      .catch(async (err)=>{
          const errobj=await err.json()
          temperror.push(errobj.message)
          setErrors(temperror)
          return
        });
  };

  return (
    <div className="signup-section">
      <h3 className="signup-title">Finishing signing up</h3>
      <div className="signup-load">
      <form onSubmit={handleSubmit} className='signupform'>
           
         {!!errors.length &&    
           <div className='signup-errorload'>
           <div className="signup-erroricon"><i className="fa-solid fa-circle-exclamation"/></div>
           <div className='signup-errorinfo'>
           <div className="signup-errortile">Sign up validation</div>
           
           <div className='singup-errortop'>
                {errors.map((error) => (
                <div key={error} className="signup-errortext">{error}</div>
                  ))}
           </div>
           </div>
          </div> 
         }

         <div className="signup-information">
          <div className="signup-infotop">
          <label className="signup-text">
          First name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
          </div>
          <label className="signup-text">
          Last name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="signup-information">
        <div className="signup-infotop">
        <label className="signup-text">
          Username </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <label className="signup-text">
          Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="signup-information">
        <div className="signup-infotop">
        <label className="signup-text">
          Password  </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <label className="signup-text">
          Confirm password  </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="buttons signupbt">Sign up and continue</button>
      </form>
      </div>
    </div>
  );
}

export default SignupFormModal;