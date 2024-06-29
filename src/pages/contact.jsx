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
    console.log(isValid, isNotEmpty);
  }, [userMsg.email]);

  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    setUserMsg({
      ...userMsg, [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = (e) => { 
    e.preventDefault();
    validateEmailAndMessage(userMsg.email, userMsg.message);
    console.log(isValid, isNotEmpty);
    if(isValid && isNotEmpty){
      setIsLoading(true);
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
        setIsLoading(false);
        props.showAlert("the email has been sent", 'success');

        setUserMsg({
          name: '',
          message: '',
          email: '',
        });
      }).catch((error) => {
        setIsLoading(false);
        props.showAlert(error, 'warning');
      })
    }
    else{
      props.showAlert('Enter a valid Email', 'warning');
    }
  }
  return (
    <section className=' pt-24 relative flex flex-col justify-center items-center h-full'>
        <h1 className='head-text blue-gradient_text cotact_page_heading'>Get in touch</h1>
        <div className='flex flex-wrap gap-10 mt-auto justify-center items-center'>
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
        <form className='contact_form flex flex-col p-10 rounded-2xl text-lg font-sans font-bold mt-10 mb-10'>
        <div className='flex flex-col gap-2 w-auto'>
            <label className='blue-gradient_text text-slim' htmlFor="email">Name:</label>
            <input
              className='border-1 p-1 text-thin input_text_contact focus:outline-none'
              id="name"
              name="name"
              value={userMsg.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='blue-gradient_text' htmlFor="email">Email:</label>
            <input
              className='border-1 p-1 text-thin input_text_contact focus:outline-none'
              type="email"
              id="email"
              name="email"
              value={userMsg.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='blue-gradient_text' htmlFor="message">Message:</label>
            <textarea
              className='border-1 p-1 text-thin input_text_contact focus:outline-none'
              id="message"
              name="message"
              value={userMsg.message}
              onChange={handleOnChange}
              required
            />
          </div>
          <button disabled={userMsg.email === ''?1:0} className='contact_sendemail_btn' onClick={handleOnSubmit}>Send</button>
        </form>
    </section>
  )
}

export default Contact
