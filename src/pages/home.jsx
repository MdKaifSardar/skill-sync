import React from 'react'
import { tech } from '../constants' 
import '../css/home.css' 

const Home = () => {
  return (
    <div className='flex flex-col w-full h-fit justify-center items-center bg-slate-300/10 mt-20 p-10 gap-3'>
      <div className='header_div rounded-xl flex flex-col gap-2 p-3 bg-slate-300/20 shadow-md h-fit w-4/5'>
        <div>
          <span className='text-4xl font-sans font-semibold blue-gradient_text'>Hi</span> <span className='text-2xl font-sans'>there, welcome to SkillSync</span>
        </div>
        <div className='remove_margin flex flex-col mt-2 ml-10 mr-10'>
          <span className='sm:text-lg text-sm italic'>SkillSync is a powerful web application designed to help you enhance and perfect your resume. Born from the innovative <span className='font-semibold blue-gradient_text not-italic'>Buildspace</span> event, our platform leverages the cutting-edge  google <span className='font-semibold blue-gradient_text not-italic'>Gemini API </span>to provide expert insights regarding your resume to ensure your resume stands out in today's competitive job market.</span>
        </div>
      </div>


      <div className='tech_div rounded-xl flex flex-col gap-3 p-3 bg-slate-300/20 shadow-md h-fit w-4/5 ml-auto mr-auto'>
        <span className='sm:text-2xl text-xl font-sans font-semibold blue-gradient_text'>Tech Stack:</span>
        <p className='remove_margin sm:text-lg text-sm italic ml-10 mr-10'>Here is the tech stack used to build this application:</p>
        <div className='flex flex-wrap gap-12 justify-center items-center mt-3'>
          {
            tech.map((tech, index) => {
              return(
                <div key={index} className='block-container w-20 h-20'>
                  <div className='btn-back rounded-2xl'/>
                  <div className='gap-2 btn-front rounded-2xl flex flex-col justify-center items-center'>
                    <img src={tech.iconUrl} alt={tech.name} className='w-1/2 h-1/2 object-contain' />
                    <p className='font-semibold font-sans text-slate-500/50'>
                      {tech.name}
                    </p>
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
