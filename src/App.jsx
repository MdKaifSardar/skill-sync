import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './components/navbar';
import {Home, About, Contact} from './pages';
import Alert from './components/alert';
import Pdfupload from './components/pdfupload';
import UserState from './context/userState';
import ResumeQuery from './components/resumequery';
import Hrcheck from './components/hrcheck';
import Loader from './components/loader';
import Findjobs from './components/findjobs';
import AuthState from './context/authState';
import Login from './components/login';
import Signup from './components/signup';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <main>
        <Router>
          <AuthState showAlert={showAlert} setIsLoading={setIsLoading}>
            <UserState showAlert={showAlert} setIsLoading={setIsLoading}>
              <Navbar/>
              {isLoading && <Loader/>}
              <Alert alert={alert} />
              <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/contact' element={<Contact showAlert={showAlert} setIsLoading={setIsLoading}/>}/>
                  <Route path='/resumecheck' element={<Pdfupload/>}/>
                  <Route path='/resumequery' element={<ResumeQuery/>}/>
                  <Route path='/hrresumecheck' element={<Hrcheck/>}/>
                  <Route path='/findjobs' element={<Findjobs/>}/>
                  <Route path='/login' element={<Login showAlert={showAlert} setIsLoading={setIsLoading}/>}/>
                  <Route path='/signup' element={<Signup showAlert={showAlert} setIsLoading={setIsLoading}/>}/>
              </Routes>
            </UserState>
          </AuthState>
        </Router>
    </main> 
  )
}

export default App;
