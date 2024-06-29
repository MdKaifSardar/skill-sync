import React, { useState} from "react";
import axios from 'axios';
import UserContext from "./userContext";


const UserState = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resumeResults, setResumeResults] = useState([]);
    const [names, setNames] = useState([]);
    const [checkresult, setCheckresult] = useState('');
    const [queryresult, setQueryresult] = useState('');
    const [formData, setFormData] = useState({
      title: '',
      file: '',
      query: '',
      requirements: ''
    });

    const [hrFormData, setHrFormData] = useState({
      files: [],
      requirements: ''
    });

    const removeAll = () => {
      setHrFormData({
        files: []
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      props.setIsLoading(true);
      const files = hrFormData.files;
      const nameResults = await Promise.all(files.map(getOwnerName));
      const results = await Promise.all(files.map(hrResumeCheck));
      setResumeResults(results);
      setNames(nameResults);
      props.setIsLoading(false);
      setIsSubmitted(true);
    };
  
    const handleFileChange = (e) => {
      setHrFormData({
        ...hrFormData,
        files: Array.from(e.target.files)
      });
    };
  
    const handleInputChange = (e) => {
      setHrFormData({
        ...hrFormData,
        [e.target.name]: e.target.value
      });
    };

    const handleOnChange = (e) => {
      // if (e.target.name === 'file') {
      //   setFormData({
      //     ...formData,
      //     [e.target.name]: e.target.files[0]
      //   });
      // }
      // else{
        setFormData({
          ...formData, [e.target.name]: e.target.value
        })
      }
    // }

  const checkResume = async (e) => {
    e.preventDefault();
    try {
        props.setIsLoading(true);
        const response = await axios.post('http://localhost:5000/api/resume/resume-check', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
      setCheckresult(response.data.answer);
      props.setIsLoading(false);
    } catch (error) {
      console.error('Error querying PDF:', error);
    }
  }
  const queryResume = async (e) => {
    e.preventDefault();
    try {
        props.setIsLoading(true);
        const response = await axios.post('http://localhost:5000/api/resume/resume-query', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
      setQueryresult(response.data.answer);
      props.setIsLoading(false);
    } catch (error) {
      console.error('Error querying PDF:', error);
    }
  }

  const hrResumeCheck = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('requirements', hrFormData.requirements);
      const response = await axios.post('http://localhost:5000/api/resume/hr-resume-check', formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          },
      });
      return response.data.answer;
    } catch (error) {
      console.error('Error querying PDF:', error);
    }
  }

  const getOwnerName = async (file) => {
   try{
    const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:5000/api/resume/resume-getowner', formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          },
      });
      return response.data.resume_name;
   } catch (error) {
    console.error('Error querying PDF:', error);
   }
  }
    return (
        <UserContext.Provider value={{removeAll, names, getOwnerName, resumeResults, isSubmitted, handleSubmit, handleFileChange, handleInputChange, hrResumeCheck, setHrFormData, hrFormData, queryResume, setFormData, handleOnChange, formData, checkResume, checkresult, queryresult}}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState;