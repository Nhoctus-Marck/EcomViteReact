import React from 'react'
import logo from "../assets/logo.png"

const header = () => {
  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4'>
        <div className="flex items-center h-full">
            <div className="h-12">
                <img src={logo} className="w-20" alt='' />
            </div>
        </div>
    </header>
  )
}

export default header