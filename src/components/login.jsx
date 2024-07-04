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
    <div className='flex flex-row justify-center items-center w-full h-fit mt-32 p-2'>
      <div className='flex flex-col gap-3 justify-center items-center bg-slate-300/10 shadow rounded-2xl px-2 py-4'>
        <span className='sm:text-4xl text-3xl font-sans font-semibold blue-gradient_text text-center'>
          Login to SkillSync
        </span>
        <form onSubmit={handleSubmitLogin} className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center gap-1">
            <label htmlFor="email" className='text-center text-lg text-slate-500/60'>
              Enter email address
            </label>
            <input type="email" required className="form-control" value={email} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter Email" onChange={onChange}/>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <label htmlFor="password" className='text-center text-lg text-slate-500/60' required>
              Enter password
            </label>
            <input onChange={onChange} type="password" value={password} className="form-control" id="password" name="password" placeholder="Enter Password"/>
          </div>
          <button type="submit" disabled={credentials.email === ''&&credentials.password === ''} className="mt-3 ml-auto mr-auto w-fit bg-gradient-to-r from-blue-400 to-blue-500 p-2 font-sans text-semibold text-white hover:from-blue-700/80 hover:to-blue-600/60 rounded-2xl shadow">
            Login
          </button>
        </form>
        <div className='p-2 bg-slate-300/30'>
          Don't have an account? <span>
            <Link className="text-blue-500 hover:cursor-pointer" to="/signup">Create One</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login;
