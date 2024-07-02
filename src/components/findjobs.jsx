import React, { useEffect } from 'react'
import { useContext } from "react";
import UserContext from "../context/userContext";
import JobBox from './jobBox';

const Findjobs = () => {
    const context = useContext(UserContext);
    const {jobFormData, setJobFormData, handleJobFormChange, findJobsFetch, jobs} = context;
    // useEffect(() => {
    //     console.log("the useeffect is running");
    //     fetchJobs();
    //     console.log(jobs);
    // }, []);
  return (
    <div className='mt-20 p-5 pt-0 h-fit w-full flex flex-col justify-center items-center bg-slate-500/10 text-blue'>
        <form className='flex flex-wrap w-full rounded-b-full justify-center items-center gap-3 p-4 bg-slate-300/50' action="sumbit" onSubmit={findJobsFetch}>
            <div className='flex flex-col justify-center'>
                <label htmlFor="country-list">Choose Country</label>
                <input type="text" id="country-list" name="country" list="country" onChange={handleJobFormChange} required/>
                <datalist id="country">
                    <option value="in"></option>
                    <option value="us"></option>
                    <option value="gb"></option>
                    <option value="au"></option>
                    <option value="mx"></option>
                    <option value="fr"></option>
                </datalist>
            </div>

            <div className='flex flex-col justify-center'>
                <label htmlFor="location">Choose city</label>
                <input onChange={handleJobFormChange} type="text" name="city" id="city" placeholder='Enter City' required/>
            </div>

            <div className='flex flex-col justify-center'>
                <label htmlFor="file">Upload Resume</label>
                <input onChange={(e) => {
                    setJobFormData({
                        ...jobFormData, 
                        file: e.target.files[0]
                    })
                }} 
                accept='application/pdf'
                type="file" 
                className='bg-white hover:cursor-pointer' 
                name="file" 
                id="file" 
                placeholder='Upload Resume' 
                required
                />
            </div>
            <div className='flex flex-col justify-center'>
                <button type='submit' className='rounded-2xl p-2 bg-slate-400/40 text-white text-xl font-semibold hover:bg-black'>
                    Search Jobs
                </button>
            </div>
        </form>
    {jobs && jobs.length > 0 ? (
        <JobBox/>
      ) : (
        <p>No Results</p>
      )}
    </div>
  )
}

export default Findjobs
