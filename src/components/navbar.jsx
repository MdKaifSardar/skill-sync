import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/navbar.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClick = () => {
        setIsOpen(!isOpen);
    }
  return (
    <header className='header'>
        <NavLink to="/" className="p-2 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
            <p className='blue-gradient_text'>SkillSync</p>
        </NavLink>
        <div className='flex flex-row items-center'>
            <nav className='real_nav'>
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
                    Multi Check
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
