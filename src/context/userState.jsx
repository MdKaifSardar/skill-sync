import React, { useState} from "react";
import UserContext from "./userContext";


const UserState = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resumeResults, setResumeResults] = useState([]);
    const [names, setNames] = useState([]);
    const [checkresult, setCheckresult] = useState('');
    const [queryresult, setQueryresult] = useState('');
    const [jobs, setJobs] = useState([]);
    // const host = 'https://skillsync-api-deployment.vercel.app';
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
      props.setIsLoading(true);
      const skills = await findSkill();
      console.log('country: ', jobFormData.country);
      console.log('city: ', jobFormData.city);
      console.log('skills: ', skills);
      
      await fetchJobs(skills);
      props.setIsLoading(false);
    }
    const handleJobFormChange = (e) => {
      setJobFormData({
        ...jobFormData, 
        [e.target.name]: e.target.value
      })
    }

    const findSkill = async () => {
      try{
        const formData = new FormData();
        formData.append('file', jobFormData.file);
        const response = await fetch(`/api/resume/resume-get-details`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        return data.resume_skills;
      } catch (error) {
       console.error('Error querying PDF:', error);
      }
    }
    const fetchJobs = async (skills) => {
      try{
        console.log("the fetchjobs is running");
        const response = await fetch(`/api/job/job-listings`, {
          method: "POST", 
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            country: jobFormData.country,
            city: jobFormData.city,
            skills: skills
          }), 
        }); 
        const json = await response.json();

        console.log(json.results);

        setJobs(json.results);
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

  const checkResume = async (e) => {
    e.preventDefault();
    try {
        props.setIsLoading(true);
        const formDataNew = new FormData();
        formDataNew.append('file', formData.file);
        formDataNew.append('requirements', formData.requirements);
        const response = await fetch(`/api/resume/resume-check`, {
          method: 'POST',
          body: formDataNew
        });
        const result = await response.json();
        setCheckresult(result.answer);
        props.setIsLoading(false);
    } catch (error) {
      props.setIsLoading(false);
      console.error('Error querying PDF:', error.message);
    }
  }
  const queryResume = async (e) => {
    e.preventDefault();
    try {
        props.setIsLoading(true);
        const formDataNew = new FormData();
        formDataNew.append('file', formData.file);
        formDataNew.append('query', formData.query);
        const response = await fetch(`/api/resume/resume-query`, {
          method: 'POST',
          body: formDataNew
        });
        const result = await response.json(); 
      setQueryresult(result.answer);
      props.setIsLoading(false);
    } catch (error) {
      props.setIsLoading(false);
      console.error('Error querying PDF:', error);
    }
  }

  const hrResumeCheck = async (file) => {
    try {
      props.setIsLoading(true);
      const formDataNew = new FormData();
      formDataNew.append('file', file);
      formDataNew.append('requirements', hrFormData.requirements);
      const response = await fetch(`/api/resume/hr-resume-check`, {
        method: 'POST',
        body: formDataNew
      });
      const result = await response.json(); 
      props.setIsLoading(false);
      return result.answer;
    } catch (error) {
      console.error('Error querying PDF:', error);
    }
  }

  const getOwnerName = async (file) => {
   try{
      const formDataNew = new FormData();
      formDataNew.append('file', file);
      const response = await fetch(`/api/resume/resume-get-details`, {
        method: 'POST',
        body: formDataNew
      });
      const result = await response.json(); 
      return result.resume_name;
   } catch (error) {
    console.error('Error querying PDF:', error);
   }
  }
    return (
        <UserContext.Provider value={{findJobsFetch, jobFormData, setJobFormData, handleJobFormChange, findSkill, jobs, fetchJobs, removeAll, names, getOwnerName, resumeResults, isSubmitted, handleSubmit, handleFileChange, handleInputChange, hrResumeCheck, setHrFormData, hrFormData, queryResume, setFormData, handleOnChange, formData, checkResume, checkresult, queryresult}}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState;