import React from 'react'
import { tech } from '../constants' 
import '../css/home.css' 

const Home = () => {
  return (
    <div style={{backgroundImage: "url('./skillsyncback.png')"}} className='pb-5 home_bg flex flex-col w-full h-fit justify-center items-center mt-[98px] pt-3 p-2 gap-3'>
      <div className='header_div rounded-xl flex flex-col gap-2 p-3 bg-slate-300/20 shadow-md h-fit w-4/5'>
        <div>
          <span className='sm:text-4xl text-2xl font-sans font-semibold blue-gradient_text'>Hi</span> <span className='sm:text-2xl text-xl font-sans'>there, welcome to SkillSync</span>
        </div>
        <div className='sm:flex sm:flex-col remove_margin hidden mt-2 lg:ml-6 lg:mr-6 md:px-2 px-1'>
          <span className='sm:text-lg text-sm italic'>SkillSync is a powerful web application designed to help you enhance and perfect your resume. Built from the innovative <span className='font-semibold blue-gradient_text not-italic'>Buildspace</span> event, our platform leverages the cutting-edge  google <span className='font-semibold blue-gradient_text not-italic'>Gemini API </span>to provide expert insights regarding your resume to ensure your resume stands out in today's competitive job market.</span>
        </div>
        <div className='sm:hidden block'>
          <span className='sm:text-lg text-sm italic'>SkillSync is a powerful web application designed to help you enhance and perfect your resume.</span>
        </div>
      </div>


      <div className='tech_div rounded-xl flex flex-col gap-2 p-3 bg-slate-300/20 shadow-md h-fit w-4/5 ml-auto mr-auto'>
        <span className='sm:text-2xl text-xl font-sans font-semibold blue-gradient_text'>Tech Stack:</span>
        <p className='sm:text-lg text-sm italic sm:ml-10 sm:mr-10'>Here is the tech stack used to build this application:</p>
        <div className='flex flex-wrap gap-12 justify-center items-center mt-3'>
          {
            tech.map((tech, index) => {
              return(
                <div key={index} className='block-container sm:w-20 w-10 sm:h-20 h-10'>
                  <div className='btn-back sm:rounded-2xl rounded-xl shadow'/>
                  <div className='gap-2 btn-front sm:rounded-2xl rounded-xl flex flex-col justify-center items-center'>
                    <img src={tech.iconUrl} alt={tech.name} className='w-1/2 h-1/2 object-contain' />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Home
