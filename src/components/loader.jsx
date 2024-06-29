import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-row justify-center items-center absolute mt-1 w-full'>
        <div className='flex flex-row justify-center items-center ml-auto mr-auto p-2 font-serif text-md rounded h-fit shadow'>
            <img className='w-6 h-6' src="./loading.gif" alt="loading gif" />
        </div>
    </div>
  )
}

export default Loader
