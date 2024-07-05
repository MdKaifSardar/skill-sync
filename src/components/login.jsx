import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/authContext';
import { Link, useNavigate } from "react-router-dom";
import '../css/login.css';

const Login = (props) => {
  const context = useContext(AuthContext);
  const {credentials, handleSubmitLogin, onChange} = context;
  const {email, password} = credentials;
  let navigate = useNavigate();


  useEffect(() => {
    if(localStorage.getItem('token')){
      props.showAlert("you are already logged in.", "danger");
      navigate("/");
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className="mb-5 flex flex-col justify-center items-center p-2 mr-auto ml-auto w-full mt-28">
        <form onSubmit={handleSubmitLogin} className="flex flex-col justify-center items-center  bg-gradient-to-r rounded-2xl from-blue-300 to-blue-500 py-4 w-fit px-1 gap-2 ">
          <span className='sm:text-3xl text-2xl font-bold font-sans text-white text-center'>
            Login to SkillSync
          </span>

          <div className="flex flex-col justify-center w-2/3">
            <label htmlFor="email" className="sm:text-lg text-sm font-sans font-normal text-black">
              Enter email address
            </label>
            <input type="email" required className="form-control" value={email} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter Email" onChange={onChange}/>
          </div>

          <div className="flex flex-col justify-center w-2/3">
            <label htmlFor="password" className="sm:text-lg text-sm font-sans font-normal text-black" required>
              Enter password
            </label>
            <input onChange={onChange} type="password" value={password} className="form-control" id="password" name="password" placeholder="Enter Password"/>
          </div>

          <button type="submit" disabled={credentials.email === ''&&credentials.password === ''} className="mt-3 shadow bg-gradient-to-l text-white rounded-xl from-green-300 to-green-500 px-3 py-2 hover:from-green-500 hover:to-green-300 font-normal font-sans sm:text-lg text-md hover:cursor-pointer">
            Login
          </button>
          <div className='flex flex-wrap justify-center items-center p-3'>
            <span className='text-sans text-black text-center text-thin'>
              Don't have an account? 
            </span>
            <Link className="hover:text-white text-semibold text-center" to="/signup">
              Create One
            </Link>
          </div>

        </form>
      </div>
  )
}

export default Login;
