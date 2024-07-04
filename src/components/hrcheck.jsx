import React from 'react'
import { useContext } from "react";
import UserContext from "../context/userContext";

const Hrcheck = () => {
    const context = useContext(UserContext);
  const {formData, removeAll, names, resumeResults, isSubmitted, hrFormData, handleSubmit, handleFileChange, handleInputChange,} = context;
  return (
    <div className='sm:p-10 p-2 rounded-2xl bg-slate-300/10 shadow mr-auto ml-auto flex flex-col justify-center items-center w-4/5 h-fit mt-32 gap-2'>
        <span className='md:text-5xl sm:text-3xl text-2xl blue-gradient_text font-bold text-center'>Check Multiple Resumes</span>
          <form className='mt-2 p-3 flex flex-col justify-center gap-3' onSubmit={handleSubmit}>
              <div className='flex flex-col justify-center gap-2'>
                <label htmlFor='requirements' className='text-center sm:text-xl text-sm font-sans text-slate-500/60'>
                  Enter Job Requirements
                </label>
                <textarea 
                  id='requirements'
                  type="text" 
                  className='form-control'
                  placeholder='Job Requirements'
                  name='requirements'
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='flex flex-col justify-center gap-2'>
                <label htmlFor='file' className='text-center sm:text-xl text-sm font-sans text-slate-500/60'>
                Upload Resumes:
                </label>
                <input 
                  id='file'
                  type="file" 
                  className='form-control mb-2'
                  placeholder='File'
                  name='file'
                  value={formData.files}
                  multiple
                  accept='application/pdf'
                  onChange={handleFileChange}
                  required
                />
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
                <button className='w-fit bg-gradient-to-r from-blue-400 to-blue-500 p-2 font-sans text-semibold text-white hover:from-blue-700/80 hover:to-blue-600/60 rounded-2xl shadow' type='submit'>Check</button>
                <button className='w-fit bg-gradient-to-r from-red-400 to-red-500 p-2 font-sans text-semibold text-white hover:from-red-700/80 hover:to-red-600/60 rounded-2xl shadow' onClick={removeAll}>Remove All</button>
            </div>
          </form>

          <span className='sm:text-3xl text-xl blue-gradient_text font-sans mb-1 font-bold'>Resumes:</span>
          {
            hrFormData.files.length > 0 && isSubmitted ? (
            <ul className='flex flex-col sm:gap-5 gap-3 p-3 bg-slate-300/10 shadow rounded-md'>
                {hrFormData.files.map((file, index) => (
                    <li className='flex flex-col bg-slate-300/30 text-2xl rounded-md shadow p-3 font-sans sm:font-semibold font-semibold' key={index}>
                        {names[index]}
                        <p style={{ whiteSpace: 'pre-wrap' }} className='mt-2 p-2 sm:text-xl text-sm sm:font-semibold font-normal text-slate-600/70 rounded-md'>
                            {resumeResults[index]}
                        </p>
                    </li>
                ))}
            </ul>
            ): <p>No files uploaded</p>
          }
        </div>
  )
}

export default Hrcheck
