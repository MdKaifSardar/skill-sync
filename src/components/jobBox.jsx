import React from 'react'
import { useContext } from "react";
import UserContext from "../context/userContext";
import { Link } from 'react-router-dom'

const JobBox = () => {
    const context = useContext(UserContext);
    const {fetchJobs, jobs} = context;
  return (
    <div className='flex flex-col gap-4 justify-center items-center sm:mt-5 mt-3 w-4/5'>
          {jobs.map((job, index) => (
            //jobs delatils box:
            <div key={index} className='job_card md:flex-row md:items-stretch flex flex-col gap-3 justify-stretch items-center p-3 text-md rounded-xl w-[100%] bg-slate-400/20'>
            {/* job details: */}
                <div className='bg-slate-900/10 w-full rounded-xl flex flex-col justify-center items-center p-3'>
                    <div className='md:w-1/2 w-full p-2 rounded-2xl shadow_ani flex flex-wrap justify-center items-center gap-1'>
                        <span className='span_text text-2xl text-slate-700/50 font-semibold font-sans'>
                            Company:
                        </span>
                        <span className='text-2xl text-black font-semibold font-sans w-fit text-center'>
                            {job.company.display_name}
                        </span>
                    </div>
                    <div className='p-2 rounded-2xl shadow_ani flex flex-wrap justify-center items-center gap-1'>
                        <span className='span_text text-slate-900/40 font-semibold'>
                            Job Tile: 
                        </span> 
                        <span className='text-center'>{job.title}</span>
                    </div>
                    <div className='p-2 rounded-2xl shadow_ani flex flex-wrap justify-center items-center gap-1'>
                        <span className='span_text text-slate-900/40 font-semibold'>
                            Located In:
                        </span>
                        {job.location.area.map((area, index) => (<span key={index}> {area}, </span>))}
                    </div>
                    {
                        job.contract_time === 'full_time' 
                        ? <div className='p-2 rounded-2xl shadow_ani flex flex-wrap justify-center items-center gap-1'>
                            <span className='span_text text-slate-900/40 font-semibold'>
                                Job Type: 
                            </span> 
                            <span>Full Time</span>
                        </div>
                        : null
                    }
                    {
                        job.salary_max && job.salary_min && <div className='p-2 rounded-2xl shadow_ani flex flex-wrap justify-center items-center gap-1'>
                            <span className='span_text text-slate-900/40 font-semibold'>
                                Salary: 
                            </span>
                            <span>
                                {job.salary_max} - {job.salary_min}
                            </span>
                        </div>
                    }
                    <Link className='mt-2 ml-auto mr-auto w-fit bg-gradient-to-r from-blue-400 to-blue-500 p-2 font-sans text-semibold text-white hover:from-blue-700/80 hover:to-blue-600/60 rounded-2xl shadow' to={job.redirect_url}>
                        Visit Site
                    </Link>
                </div>
            <div className='h-full w-full flex flex-col mt-auto mb-auto md:p-5 p-1'>
                <span className='text-xl text-slate-900/40 font-semibold md:mb-0 mb-2'>Description: </span>
                <span className='md:p-3 text-sm'>{job.description}</span>
            </div>
        </div>
        ))}
    </div>
  )
}

export default JobBox
