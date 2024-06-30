import React from 'react'
import { useContext } from "react";
import UserContext from "../context/userContext";
import { Link } from 'react-router-dom'

const JobBox = () => {
    const context = useContext(UserContext);
    const {fetchJobs, jobs} = context;
  return (
    <div className='flex flex-col bg-slate-200/20 gap-4 justify-center items-center w-4/5 p-10'>
          {jobs.map((job, index) => (
            <div key={index} className='flex flex-row gap-3 bg-slate-400/20 p-3 h-fit w-fit text-md rounded-xl'>
            <div className='w-1/2 bg-slate-900/10 gap-2 rounded-xl flex flex-col justify-center items-center p-2'>
                <div className='p-2 rounded-2xl shadow_ani'>
                    <span className='span_text text-2xl text-slate-700/50 font-semibold font-sans'>
                        Company:
                    </span>
                    <span className='text-2xl text-black font-semibold font-sans'>
                        {' ' + job.company. display_name}
                    </span>
                </div>
                <div className='p-2 rounded-2xl shadow_ani'>
                    <span className='span_text text-slate-900/40 font-semibold'>
                        Job Tile: 
                    </span> {job.title}
                </div>
                <div className='p-2 rounded-2xl shadow_ani'>
                    <span className='span_text text-slate-900/40 font-semibold'>
                        Located In:
                    </span>
                    {job.location.area.map((area, index) => (<span key={index}> {area}, </span>))}
                </div>
                {
                    job.contract_time === 'full_time' ? <span>
                        <span className='text-slate-900/40 font-semibold'>
                            Job Type: 
                        </span> Full Time
                    </span>: null
                }
                {
                    job.salary_max && job.salary_min && <span>
                        <span className='text-slate-900/40 font-semibold'>
                            Salary: 
                        </span>
                        {job.salary_max} - {job.salary_min}
                    </span>
                }
                <Link className='bg-blue-900/100 p-2 text-white text-xl font-semibold h-fit w-fit rounded-xl' to={job.redirect_url}>
                    Visit Site
                </Link>
            </div>
              <p className='w-1/2 bg-slate-300/10 flex flex-col justify-center mb-3'>
                <span className='text-xl text-slate-900/40 font-semibold'>Description: </span>
                <span className='p-3 text-sm'>{job.description}</span>
              </p>
            </div>
          ))}
        </div>
  )
}

export default JobBox
