import React, { useEffect } from 'react'
import { useContext } from "react";
import UserContext from "../context/userContext";
import JobBox from './jobBox';

const Findjobs = () => {
    const context = useContext(UserContext);
    const {jobFormData, setJobFormData, handleJobFormChange, findJobsFetch, jobs} = context;
  return (
    <div className='mt-20 px-2 h-fit w-full flex flex-col justify-center items-center'>
        <form className='flex flex-col w-full rounded-b-full justify-center items-center p-4 gap-3 bg-slate-300/50 shadow-md' action="sumbit" onSubmit={findJobsFetch}>
            <div className='flex flex-wrap justify-center items-center sm:gap-3 gap-2'>
                <div className='flex flex-col justify-center'>
                    <label htmlFor="country-list">Choose Country</label>
                    <input placeholder='Choose Country' type="text" className='form-control' id="country-list" name="country" list="country" onChange={handleJobFormChange} required/>
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
                    <input className='form-control' onChange={handleJobFormChange} type="text" name="city" id="city" placeholder='Enter City' required/>
                </div>

                <div className='flex flex-col justify-center'>
                    <label htmlFor="file">Upload Resume</label>
                    <input 
                    onChange={(e) => {
                        setJobFormData({
                            ...jobFormData, 
                            file: e.target.files[0]
                        })
                    }} 
                    accept='application/pdf'
                    type="file" 
                    className='form-control' 
                    name="file" 
                    id="file" 
                    placeholder='Upload Resume' 
                    required
                    />
                </div>
            </div>
            <div className='flex flex-col justify-center'>
                <button type='submit' className='ml-auto mr-auto w-fit bg-gradient-to-r from-blue-400 to-blue-500 p-2 font-sans text-semibold text-white hover:from-blue-700/80 hover:to-blue-600/60 rounded-2xl shadow'>
                    Search Jobs
                </button>
            </div>
        </form>
    {jobs && jobs.length > 0 ? (
        <JobBox/>
      ) : (
        <p className='sm:mt-10 mt-3 sm:text-xl text-md font-sans'>No Results</p>
      )}
    </div>
  )
}

export default Findjobs
