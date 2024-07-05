import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 flex flex-col justify-evenly items-center sm:gap-4 gap-2 py-2 w-full h-fit'>
      <div className='px-2 flex flex-wrap justify-evenly items-center sm:gap-4 gap-2 py-5 w-full h-fit'>
        <div className='flex flex-col justify-center items-center gap-2 sm:text-lg text-sm text-white'>
            <span className='text-md font-thin font-sans text-black mb-2'>Some Links</span>
            <div>
              <Link target="_blank" rel="noopener noreferrer" className='gap-1 hover:text-blue-700 flex flex-row justify-center items-center hover:cursor-pointer' to='https://github.com/MdKaifSardar'>
                <i className="fa-brands fa-github"></i>
                <div>GitHub</div>
                <div className='h-5 w-5'>
                  <i className="h-5 w-5 fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </Link>
            </div>
            <div>
              <Link target="_blank" rel="noopener noreferrer" className='gap-1 hover:text-blue-700 flex flex-row justify-center items-center hover:cursor-pointer' to='https://www.linkedin.com/in/md-kaif-sardar-12aab4290/'>
                <i className="fa-brands fa-linkedin"></i>
                <div>LinkedIn</div>
                <div>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </Link>
            </div>
            <div>
              <Link target="_blank" rel="noopener noreferrer" className='gap-1 hover:text-blue-700 flex flex-row justify-center items-center hover:cursor-pointer' to='https://www.facebook.com/mdkaif.sardar.52/'>
                <i className="fa-brands fa-facebook"></i>
                <div>Facebook</div>
                <div>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </Link>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-2 sm:text-lg text-sm text-white'>
            <span className='text-md font-thin font-sans text-black mb-2'>About Me</span>
            <div>
              <Link className='hover:text-blue-700 flex flex-row justify-center items-center hover:cursor-pointer' target="_blank" rel="noopener noreferrer" to='https://portfolio-website-82ueuzamd-md-kaif-sardars-projects.vercel.app'>
                <div>Portfolio Website</div>
                <div>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </Link>
            </div>
            <div>
              <Link className='hover:text-blue-700 flex flex-row justify-center items-center hover:cursor-pointer' to='/about'>
                <div>
                  About This Project
                </div>
                <div>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </Link>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-2 sm:text-lg text-sm text-white'>
            <span className='text-md font-thin font-sans text-black mb-2'>Get In Touch:</span>
            <Link to='/contact' className='hover:text-blue-500'>Send an Email</Link>
            <div>mkaifsard564773@gmail.com</div>
            <div>kaifsardar001@gmail.com</div>
          </div>
      </div>
      <div>
        <span className='sm:text-md text-sm text-white font-sans font-thin'>

        </span>
      </div>
    </div>
  )
}

export default Footer
