import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/navbar.css'
import {
    skillsync
  } from "../assets/icons";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClick = () => {
        setIsOpen(!isOpen);
    }
  return (
    <header className='header'>
        <NavLink to="/" className="p-3 pt-1 pb-1 rounded-3xl items-center justify-center flex flex-row">
            <img src={skillsync} alt="Skillsync logo" className='w-10 h-10 mr-2'/>
            <span className='font-sans text-lg'>SkillSync</span>
        </NavLink>
        <div className='flex flex-row items-center'>
            <nav className='real_nav'>
                <NavLink to='/about' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                    About
                </NavLink>
                <NavLink to='/contact' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                    Contact
                </NavLink>
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

            <nav className='navbar_item_list'>
                <div className={`${isOpen?'nav_list_open':'nav_list_closed'}`}>
                    <NavLink to='/about' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        About
                    </NavLink>
                    <NavLink to='/contact' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        Contact
                    </NavLink>
                    <NavLink to='/resumecheck' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        Resume Check
                    </NavLink>
                    <NavLink to='/resumequery' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        Resume Query
                    </NavLink>
                    <NavLink to='/hrresumecheck' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        Hr Area
                    </NavLink>
                    <NavLink to='/findjobs' className={({isActive}) => isActive?'text-blue-500':'text-black-500'}>
                        Find Jobs
                    </NavLink>
                </div>
                <div onClick={handleOnClick} className='flex justify-center items-center rounded-2xl p-2 nav_item_list_icon'>
                    click
                </div>
            </nav>
        </div>
    </header> 
  )
}

export default Navbar;
