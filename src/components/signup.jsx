import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/authContext';
import '../css/signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const {credentials, onChange, handleSubmitSignup} = context;
  const {name, email, password, cpassword} = credentials;
  const [scrollY, setScrollY] = useState(0);
  const [toggle, setToggle] = useState(false);

  const toggleBtn = () => {
    setToggle(!toggle);
  } 
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    if(localStorage.getItem('token')){
      props.showAlert("you are already logged in to your account.", "danger");
      navigate("/");
    }
    // eslint-disable-next-line
    window.addEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="mainDivSignUp mt-28">
      <form onSubmit={handleSubmitSignup} className="signupForm">
      <span className='signUpHeading'>Sign Up To Quiller</span>
      <div className='descSignUp'>Create an account to get access to all the features of quiller</div>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            value={name}
            type="text"
            className="form-control signUpInputBox"
            id="name"
            name="name"
            aria-describedby="name" 
            onChange={onChange}
            required
            minLength={3}
          />
        </div>

          <div>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              value={email}
              type="email"
              className="emailBoxSignUp form-control signUpInputBox"
              id="email"
              name="email"
              aria-describedby="emailHelp" 
              onChange={onChange}
              required
            />
          </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            className="form-control signUpInputBox" 
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            value={cpassword}
            type="cpassword"
            id="cpassword"
            name="cpassword"
            className="form-control signUpInputBox" 
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn signUpButton">
          Sign Up
        </button>
        {
          <div className={scrollY >= 50? 'visible':'invisible'}> 
          <span>Already have an account? </span>
          <Link to='/login'>Click Here</Link>
          <span> to Log In</span>
        </div>
        }
        <div className='altDiv'>
          <span>Already have an account? </span>
            <Link to='/login'>Click Here</Link>
            <span> to Log In</span>
        </div>
      </form>
      <div onClick={toggleBtn} className='divBtnFeatures'>
      <i className="fa-solid fa-arrow-right"></i>
      </div>
      <div className={toggle == true?'sideSignUpBoxVisible':'sideSignUpBoxInvisible'}>
        <h3 className='headingFeatures'>Features in quiller: </h3>
        <ul className='boxUl'>
          <li className='features'>Upto 50GB Cloud storage space</li>
          <li className='features'>Easy note generation</li>
          <li className='features'>Downloadable in PDF format</li>
          <li className='features'>Some other random Bullshit.</li>
        </ul>
      </div>
    </div>
  );
};

export default Signup;
