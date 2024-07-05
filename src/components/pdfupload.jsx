import React, { useEffect } from 'react';
import { useContext } from "react";
import UserContext from "../context/userContext";
  
const Pdfupload = () => {
  const context = useContext(UserContext);
  const {setFormData, handleOnChange, formData, checkResume, checkresult} = context;

    return (
        <div className='mb-5 sm:p-10 p-2 rounded-2xl bg-slate-300/10 shadow mr-auto ml-auto flex flex-col justify-center items-center w-4/5 h-fit mt-32 gap-2'>
        <span className='md:text-5xl sm:text-3xl text-2xl blue-gradient_text font-bold text-center'>Check Your Resume</span>
          <form className='mt-2 p-3 flex flex-col justify-center gap-3' onSubmit={checkResume}>
            <div className='flex flex-col justify-center gap-2'>
              <label className='text-center sm:text-xl text-sm font-sans text-slate-500/60' htmlFor="requirements">Enter the job requirements</label>
              <textarea 
                id='requirements'
                type="text" 
                className='form-control'
                placeholder='Job Requirements'
                name='requirements'
                value={formData.requirements}
                onChange={handleOnChange}
                required
                />
            </div>
              <div className='flex flex-col gap-2 justify-center'>
                <label className="text-center sm:text-xl text-sm font-sans text-slate-500/60" htmlFor="file">Upload your resume</label>
                <input
                id='file'
                  type="file" 
                  className='form-control'
                  placeholder='File'
                  name='file'
                  accept='application/pdf'
                  onChange={(e) => {
                    setFormData({
                      ...formData, file: e.target.files[0]
                    })
                  }}
                  required
                />
              </div>
            <button className='ml-auto mr-auto w-fit bg-gradient-to-r from-blue-400 to-blue-500 p-2 font-sans text-semibold text-white hover:from-blue-700/80 hover:to-blue-600/60 rounded-2xl shadow' type='submit'>Upload</button>
          </form>

          <span className='sm:text-3xl text-xl blue-gradient_text font-sans mb-1 font-bold'>Answer</span>
          {checkresult ? (
            <div className='bg-slate-200/20 shadow flex flex-row px-3 sm:w-3/4 w-full h-fit rounded-lg text-sans sm:text-xl text-sm text-slate-500/80 sm:font-semibold font-normal'>
              <p className='m-auto mt-0 mb-0' style={{ whiteSpace: 'pre-wrap' }}>
                {checkresult}
              </p>
            </div>
          )
          :'No Results'}
        </div>
    );
}


export default Pdfupload
