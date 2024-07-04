import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/navbar.css'
import {
    skillsync
  } from "../assets/icons";
  import  {useContext} from 'react'
import AuthContext from '../context/authContext';

const Navbar = () => {
    const context = useContext(AuthContext);
    const {logout} = context;
    const [isOpen, setIsOpen] = useState(false);
    const [profileIsOpen, setProfileIsOpen] = useState(false);
    const [toolsIsOpen, setToolsIsOpen] = useState(false);

    const handleOnClick = () => {
        setIsOpen(!isOpen);
    }
    const handleOnClickProfile = () => {
        setProfileIsOpen(!profileIsOpen);
    }
    const handleOnClickTools = () => {
        setToolsIsOpen(!toolsIsOpen);
    }

  return (
    <header className='flex flex-row justify-between items-center absolute top-0 z-10 right-0 left-0 shadow-[0_1px_10px_1px_rgba(163,163,163,0.3)] py-4 bg-white px-4 '>
        <div className='flex flex-row justify-center items-center sm:gap-3 gap-2'>
            <NavLink to="/" className="rounded-3xl flex flex-row items-center justify-center text-xl gap-1 p-1 shadow-sm">
                <img src={skillsync} alt="Skillsync logo" className='w-10 h-10'/>
                <span className='md:block hidden'>SkillSync</span>
            </NavLink>

            <nav className='disable_small_screen'>
                <NavLink to='/about' className={({isActive}) => isActive?'text-blue-500 p-2 shadow-sm rounded-2xl':'text-black-500 p-2 shadow-sm rounded-2xl'}>
                    About
                </NavLink>
                <NavLink to='/contact' className={({isActive}) => isActive?'text-blue-500 p-2 shadow-sm rounded-2xl':'text-black-500 p-2 shadow-sm rounded-2xl'}>
                    Contact
                </NavLink>
                {
                    !localStorage.getItem('token') && 
                    <div className='flex flex-row gap-4'>
                        <NavLink to='/login' className={({isActive}) => isActive?'text-blue-500 p-2 shadow-sm rounded-2xl':'text-black-500 p-2 shadow-sm rounded-2xl'}>
                            Login
                        </NavLink>
                        <NavLink to='/signup' className={({isActive}) => isActive?'text-blue-500 p-2 shadow-sm rounded-2xl':'text-black-500 p-2 shadow-sm rounded-2xl'}>
                            Sign Up
                        </NavLink>
                    </div>
                }
            </nav>

            <nav className='navbar_item_list'>
                <div className={`${isOpen?'flex flex-col justify-center items-center gap-2 py-2 shadow bg-white absolute top-20 left-24 rounded-xl px-4':'nav_list_closed'}`}>
                    <NavLink to='/about' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        About
                    </NavLink>
                    <NavLink to='/contact' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        Contact
                    </NavLink>
                    <NavLink to='/login' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        Login
                    </NavLink>
                    <NavLink to='/signup' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        Sign Up
                    </NavLink>
                </div>
                <div onClick={handleOnClick} className='flex justify-center items-center p-3 nav_item_list_icon rounded-3xl shadow w-10 h-10'>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </nav>
        </div>
        <div className='flex flex-row items-center sm:gap-3 gap-2'>
            <nav>
                <div onClick={handleOnClickTools} className='h-10 w-10 flex flex-row justify-center items-center p-2 rounded-3xl shadow'>
                    <i className="fa-solid fa-screwdriver-wrench"></i>
                    {
                        toolsIsOpen && localStorage.getItem('token')?
                        <nav className='bg-white flex flex-col shadow justify-center items-center gap-2 p-3 absolute top-20 md:right-16 lg:right-28 right-12 rounded-xl'>
                            <NavLink to='/resumecheck' className={({isActive}) => isActive?'text-blue-500':'text-white-500'}>
                                Resume Check
                            </NavLink>
                            <NavLink to='/resumequery' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                                Resume Query
                            </NavLink>
                            <NavLink to='/hrresumecheck' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                                Multi Check
                            </NavLink>
                            <NavLink to='/findjobs' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                                Find Jobs
                            </NavLink>
                        </nav>
                        : toolsIsOpen
                        ?<nav className='rounded-xl bg-white text-black shadow flex flex-col justify-center items-center gap-2 p-3 absolute top-20 right-20'>
                            Login First to use the tools
                        </nav>
                        : null
                    }
                </div>
            </nav>
            <nav>
                <div onClick={handleOnClickProfile} className='p-2 w-10 h-10 flex flex-row justify-center items-center rounded-3xl shadow'>
                    <i className="fa-solid fa-user"></i>
                    {
                        profileIsOpen && localStorage.getItem('token')?  
                        <div className='absolute top-20 right-2 flex flex-col justify-centeritems-center p-3 bg-white shadow rounded-xl sm:text-sm gap-2'>
                            <span className='flex flex-wrap'><span className='font-bold font-sans'>Username: </span> {localStorage.getItem('user_name')}</span>
                            <span className='flex flex-wrap'><span className='font-bold font-sans'>Email: </span> {localStorage.getItem('user_email')}</span>
                            <span className='flex flex-wrap'><span className='font-bold font-sans'>Date Created: </span> {localStorage.getItem('user_date')}</span>
                            <button className='p-2 w-fit h-fit bg-red-500 text-white font-bold font-sans mr-auto ml-auto rounded-xl shadow hover:bg-red-500/70' onClick={logout}>
                                logout
                            </button>
                        </div>
                        :profileIsOpen
                        ?<p className='absolute top-20 right-10 flex flex-col justify-center  items-center p-3 bg-white sm:text-sm gap-2 rounded-xl'>
                            Login to see your profile
                        </p>
                        :null
                    }
                </div>
            </nav>
        </div>
    </header> 
  )
}

export default Navbar;
