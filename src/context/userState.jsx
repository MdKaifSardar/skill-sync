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

    // axios.defaults.withCredentials = true

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
         const response = await axios.post(`${host}/api/resume/resume-get-details`, jobFormData, {
             headers: {
             'Content-Type': 'multipart/form-data',
             },
         },
          {
            withCredentials: true  // This enables sending cookies and authentication headers
          },
        );
         return response.data.resume_skills;
      } catch (error) {
       console.error('Error querying PDF:', error);
      }
    }
    const fetchJobs = async (skills) => {
      try{
        console.log("the fetchjobs is running");
        const response = await axios.post(`${host}/api/job/job-listings`, {
            country: jobFormData.country,
            city: jobFormData.city,
            skills: skills
          },
          {
            withCredentials: true  // This enables sending cookies and authentication headers
          },
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
        const response = await axios.post(`${host}/api/resume/resume-check`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        },
        {
          withCredentials: true  // This enables sending cookies and authentication headers
        },);
      setCheckresult(response.data.answer);
      props.setIsLoading(false);
    } catch (error) {
      props.setIsLoading(false);
      console.error('Error querying PDF:', error);
    }
  }
  const queryResume = async (e) => {
    e.preventDefault();
    try {
        props.setIsLoading(true);
        const response = await axios.post(`${host}/api/resume/resume-query`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        },
        {
          withCredentials: true  // This enables sending cookies and authentication headers
        },
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
      formData.append('file', file);
      formData.append('requirements', hrFormData.requirements);
      const response = await axios.post(`${host}/api/resume/hr-resume-check`, formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          },
      },
      {
        withCredentials: true  // This enables sending cookies and authentication headers
      },
    );
      return response.data.answer;
    } catch (error) {
      console.error('Error querying PDF:', error);
    }
  }

  const getOwnerName = async (file) => {
   try{
    const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${host}/api/resume/resume-get-details`, formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          },
      },
      {
        withCredentials: true  // This enables sending cookies and authentication headers
      },
    );
      return response.data.resume_name;
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