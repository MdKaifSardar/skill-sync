import React from 'react';
import { useContext } from "react";
import UserContext from "../context/userContext";
  
const Pdfupload = () => {
  const context = useContext(UserContext);
  const {setFormData, handleOnChange, formData, checkResume, checkresult} = context;
    return (
        <div className='p-10 rounded-2xl bg-slate-300/10 shadow mr-auto ml-auto flex flex-col justify-center items-center w-4/5 h-fit mt-20 mb-4'>
        <span className='text-5xl blue-gradient_text font-bold'>Check Your Resume</span>
          <form className='p-5 flex flex-col justify-center items-center gap-2' onSubmit={checkResume}>
            <textarea 
              type="text" 
              className='form-control'
              placeholder='Job Requirements'
              name='requirements'
              value={formData.requirements}
              onChange={handleOnChange}
              required
              />
              <div className='flex flex-col gap-2 justify-center items-center'>
                <input 
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
            <button className='btn' type='submit'>Upload</button>
          </form>

          <span className='text-3xl blue-gradient_text font-sans mb-2 font-bold'>Answer</span>
          {checkresult ? (
            <div className='bg-slate-300/20 shadow flex flex-row p-3 w-3/4 h-fit rounded-lg text-sans text-xl text-slate-600/70 font-semibold'>
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
