import React from 'react'
import { useContext } from "react";
import UserContext from "../context/userContext";

const Test = () => {
    const context = useContext(UserContext);
  const {testFunc} = context;
  return (
    <div>
      <button className='bg-blue-500 text-black p-3 mt-20' onClick={testFunc}>click</button>
    </div>
  )
}

export default Test
