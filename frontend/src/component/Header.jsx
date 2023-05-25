import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
const header = () => {
  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4'>
        <div className="flex items-center h-full">
            <div className="h-12">
                <Link to={""}>
                    <img src={logo} className="w-20" alt='' />
                </Link>              
            </div>
        </div>
    </header>
  )
}

export default header