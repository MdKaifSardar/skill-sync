import React, { useState} from "react";
import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";


const AuthState = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
    let navigate = useNavigate();

    // getting the user details: 
    const getUserDetails =  async () => {
        const authToken = localStorage.getItem('token');
        const response = await fetch("/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });
        const json = await response.json();
        const dateString = json.userFound.date;
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        if(json.success){
            localStorage.setItem('user_name', json.userFound.name);
            localStorage.setItem('user_email', json.userFound.email);
            localStorage.setItem('user_year', year);
            localStorage.setItem('user_month', month);
            localStorage.setItem('user_day', day);
        }
        if(!json.success){
            props.showAlert(json.error, "danger");
        }
    }
    // logout of the account:
    const logout = () => {
        localStorage.clear(); // crening the local storage
        navigate("/login"); // navigate to the login page after logging out
    }
    // submit funciton at the login page: 
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const {email, password} = credentials
        const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}), 
        });
        const json = await response.json();
        if(json.success){
            props.showAlert("Succesfully logged into your account", "success");
            // save auth token to local history: 
            localStorage.setItem('token', json.authToken);
            setCredentials({}) // setting the credentials to normal:
            getUserDetails();
            //redirect;
            navigate("/");
        }
        if(!json.success){
            props.showAlert(json.error, "danger");
        }
    }


    // submit funciton at the sign up page: 
    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email, password}), 
        });
        const json = await response.json();
        if(json.success){
            props.showAlert("Succesfully signed up", "success");
            // save auth token to local storage: 
            localStorage.setItem('token', json.authToken);
            setCredentials({}) // setting the credentials to normal:
            getUserDetails();
            //redirect;
            navigate("/");
        }
        if(!json.success){
            props.showAlert(json.error, "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }
    return (
        <AuthContext.Provider value={{getUserDetails, logout, setCredentials, handleSubmitLogin, handleSubmitSignup, credentials, onChange}}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthState;