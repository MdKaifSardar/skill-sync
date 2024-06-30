import React from 'react'
import { useContext } from "react";
import UserContext from "../context/userContext";

const Hrcheck = () => {
    const context = useContext(UserContext);
  const {formData, removeAll, names, resumeResults, isSubmitted, hrFormData, handleSubmit, handleFileChange, handleInputChange,} = context;
  return (
    <div className='p-10 rounded-2xl bg-slate-300/10 shadow mr-auto ml-auto flex flex-col justify-center items-center w-4/5 h-fit mt-20 mb-4'>
        <span className='text-5xl blue-gradient_text font-bold mb-4'>Check Multiple Resumes</span>
          <form className='box p-5 md:p-0 flex flex-col justify-center items-center gap-2 w-auto bg-slate-300/20 rounded-lg shadow mb-5' onSubmit={handleSubmit}>
            {/* <div className='flex flex-col justify-start'> */}
                <label htmlFor='requirements' className='text-xl font-semibold mb-1 blue-gradient_text'>
                Job Requirements:
                </label>
                <textarea 
                id='requirements'
                  type="text" 
                  className='form-control mb-3'
                  placeholder='Job Requirements'
                  name='requirements'
                  onChange={handleInputChange}
                  required
                />

            {/* </div> */}
            {/* <div className='flex flex-col justify-start'> */}
                <label htmlFor='requirements' className='text-xl font-semibold mb-1 blue-gradient_text'>
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
            {/* </div> */}
            <div className='flex flex-row justify-center items-center gap-3'>
                <button className='btn' type='submit'>Check</button>
                <button className='btn' onClick={removeAll}>Remove All</button>
            </div>
          </form>

          <span className='text-3xl blue-gradient_text font-sans mb-2 font-bold'>Resumes:</span>
          {
            hrFormData.files.length > 0 && isSubmitted ? (
            <ul className='flex flex-col gap-5 mt-3 p-3 bg-slate-300/30 shadow rounded-md'>
                {hrFormData.files.map((index) => (
                    <li className='flex flex-col bg-slate-400/30 text-2xl rounded-md shadow p-3 font-sans font-semibold' key={index}>
                        {names[index]}
                        <p style={{ whiteSpace: 'pre-wrap' }} className='mt-2 p-2 text-xl font-bold text-slate-600/70 rounded-md'>
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
