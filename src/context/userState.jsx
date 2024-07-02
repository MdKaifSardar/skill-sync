import React, { useState} from "react";
import axios from 'axios';
import UserContext from "./userContext";


const UserState = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resumeResults, setResumeResults] = useState([]);
    const [names, setNames] = useState([]);
    const [checkresult, setCheckresult] = useState('');
    const [queryresult, setQueryresult] = useState('');
    const [jobs, setJobs] = useState([]);
    const host = 'https://skillsync-api-deployment.vercel.app';
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

    const [jobFormData, setJobFormData] = useState({
      file: '',
      country: '',
      city: ''
    });

    const findJobsFetch = async (e) => {
      e.preventDefault();
      const skills = await findSkill();
      console.log('country: ', jobFormData.country);
      console.log('city: ', jobFormData.city);
      console.log('skills: ', skills);
      
      await fetchJobs(skills);
    }
    const handleJobFormChange = (e) => {
      setJobFormData({
        ...jobFormData, 
        [e.target.name]: e.target.value
      })
    }

    const findSkill = async () => {
      try{
          axios.defaults.withCredentials = true
         const response = await axios.post(`${host}/api/resume/resume-get-details`, jobFormData, {
             headers: {
             'Content-Type': 'multipart/form-data',
             }
         }
        );
         return response.data.resume_skills;
      } catch (error) {
       console.error('Error querying PDF:', error);
      }
    }
    const fetchJobs = async (skills) => {
      try{
        axios.defaults.withCredentials = true
        console.log("the fetchjobs is running");
        const response = await axios.post(`${host}/api/job/job-listings`, {
            country: jobFormData.country,
            city: jobFormData.city,
            skills: skills
          }
        );

        console.log(response.data);

        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    }

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
        setFormData({
          ...formData, [e.target.name]: e.target.value
        })
      }

  const testFunc = async (e) => {
    try{
      const response = await axios.post(`${host}/temp-fetch`)
      console.log(response.data);
    } catch (error){
      console.error(error);
    }
  }

  const checkResume = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
        props.setIsLoading(true);
        const response = await axios.post(`${host}/api/resume/resume-check`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
        }
      );
      setCheckresult(response.data.answer);
      props.setIsLoading(false);
    } catch (error) {
      props.setIsLoading(false);
      console.error('Error querying PDF:', error);
    }
  }
  const queryResume = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true
    try {
        props.setIsLoading(true);
        const response = await axios.post(`${host}/api/resume/resume-query`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        }
      );
      setQueryresult(response.data.answer);
      props.setIsLoading(false);
    } catch (error) {
      console.error('Error querying PDF:', error);
    }
  }

  const hrResumeCheck = async (file) => {
    try {
      const formData = new FormData();
      axios.defaults.withCredentials = true
      formData.append('file', file);
      formData.append('requirements', hrFormData.requirements);
      const response = await axios.post(`${host}/api/resume/hr-resume-check`, formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          }
      }
    );
      return response.data.answer;
    } catch (error) {
      console.error('Error querying PDF:', error);
    }
  }

  const getOwnerName = async (file) => {
   try{
      const formData = new FormData();
      axios.defaults.withCredentials = true
      formData.append('file', file);
      const response = await axios.post(`${host}/api/resume/resume-get-details`, formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          }
      },
    );
      return response.data.resume_name;
   } catch (error) {
    console.error('Error querying PDF:', error);
   }
  }
    return (
        <UserContext.Provider value={{testFunc, findJobsFetch, jobFormData, setJobFormData, handleJobFormChange, findSkill, jobs, fetchJobs, removeAll, names, getOwnerName, resumeResults, isSubmitted, handleSubmit, handleFileChange, handleInputChange, hrResumeCheck, setHrFormData, hrFormData, queryResume, setFormData, handleOnChange, formData, checkResume, checkresult, queryresult}}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState;