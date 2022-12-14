import React from 'react'

const ResetPassword = () => {
  return (
    <div className='w-full h-screen bg-primary/90 flex justify-center items-center '>
      <div className="p-9 bg-white rounded flex flex-col justify-around items-center">
        <h1 className='text-5xl text-primary font-nunito font-bold'>Reset Password</h1>
        <div className="relative w-full">
          <input type="email" className="w-full border-b border-solid border-black w-full py=6 sm:p-4 mt-9  md:!py-6 sm:mt-4 md:!mt-9 outline-0 font-nunito font-bold text-[18px]" 
          placeholder='Email Adress'
          />
          
        </div>
        <button className="w-1/2 text-center bg-primary rounded-xl py-3 font-nunito font-semibold text-xl text-white mt-5 sm:mt-4 md:!mt-5">Send link</button>
      </div>
    </div>
  )
}

export default ResetPassword