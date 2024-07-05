import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import '../css/contact.css'

import { socialLinks } from '../constants'
import { Link } from 'react-router-dom'

const Contact = (props) => {
  const [userMsg, setUserMsg] = useState({
    name: '',
    message: '',
    email: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [isNotEmpty, setIsNotEmpty] = useState(false);

  const validateEmailAndMessage = (email, message) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    setIsValid(pattern.test(email));
    if(message != ''){
      setIsNotEmpty(true);
    }
  };

  useEffect(() => {
    validateEmailAndMessage(userMsg.email, userMsg.message);
  }, [userMsg.email]);

  const handleOnChange = (e) => {
    setUserMsg({
      ...userMsg, [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = (e) => { 
    e.preventDefault();
    validateEmailAndMessage(userMsg.email, userMsg.message);
    if(isValid && isNotEmpty){
      props.setIsLoading(true);
      console.log("the btn is pressed");

      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          form_name: userMsg.name,
          to_name: "Kaif",
          form_email: userMsg.email,
          to_email: 'mdkaifsard564773@gmail.com',
          message: userMsg.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ).then(() => {
        props.setIsLoading(false);
        props.showAlert("the email has been sent", 'success');

        setUserMsg({
          name: '',
          message: '',
          email: '',
        });
      }).catch((error) => {
        props.setIsLoading(false);
        props.showAlert(error, 'warning');
      })
    }
    else{
      props.showAlert('Enter a valid Email', 'warning');
    }
  }
  return (
    <section className='mt-32 mb-5 relative flex flex-col justify-center items-center h-full shadow p-2 sm:w-4/5 w-[90%] ml-auto mr-auto rounded-2xl bg-slate-300/20'>
        <h1 className='head-text blue-gradient_text cotact_page_heading'>Get in touch</h1>
        <div className='flex flex-wrap gap-2 mt-auto justify-center items-center'>
          {
            socialLinks.map((link, index) => (
              <div key={index} className='btn-back flex flex-col p-10 gap-4 h-fit justify-center items-center rounded-xl'>
                <div className='block-container w-12 h-12 flex flex-row'>
                  <div className={`w-12 h-12 btn-back rounded-xl ${link.theme}`}/>
                    <div className='w-12 h-12 btn-front rounded-xl flex justify-center items-center'>
                      <img src={link.iconUrl} alt={link.name} className='w-1/2 h-1/2'/>
                    </div>
                </div>
                <h3>
                  <Link 
                  className='font-semibold text-blue-500/70'
                  rel="noopener noreferrer"
                  to={link.link}
                  >
                    {link.name}
                  </Link>
                </h3>
              </div>
            ))
          }
        </div>
        <form className='flex flex-col p-10 rounded-2xl md:w-1/3 text-lg font-sans font-bold mb-10 mt-2 bg-slate-300/20 shadow bg-gradient-to-r from-blue-500 to-blue-300'>
        <div className='mb-2 text-center mr-auto ml-auto sm:text-2xl text-xl text-white'>
          Send Me a Mail:
        </div>
        <div className='flex flex-col gap-2 w-auto'>
            <label className='text-white font-thin' htmlFor="email">Name:</label>
            <input
              className='border-1 p-1 font-thin input_text_contact focus:outline-none'
              id="name"
              name="name"
              value={userMsg.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white font-thin' htmlFor="email">Email:</label>
            <input
              className='border-1 p-1 font-thin input_text_contact focus:outline-none'
              type="email"
              id="email"
              name="email"
              value={userMsg.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white font-thin' htmlFor="message">Message:</label>
            <textarea
              className='border-1 p-1 font-thin input_text_contact focus:outline-none'
              id="message"
              name="message"
              value={userMsg.message}
              onChange={handleOnChange}
              required
            />
          </div>
          <button disabled={userMsg.email === ''?1:0} className='hover:cursor-pointer mt-2 ml-auto mr-auto w-fit bg-gradient-to-r from-blue-600 to-sky-400 py-2 px-3 font-sans text-white hover:from-blue-400 hover:to-sky-600 rounded-2xl shadow' onClick={handleOnSubmit}>Send</button>
        </form>
    </section>
  )
}

export default Contact
