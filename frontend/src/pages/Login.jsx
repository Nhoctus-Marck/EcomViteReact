import React, { useState } from 'react'
import {BiShow} from 'react-icons/bi'
import {BiHide} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"

const Login = () => {
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
    }
    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(email && password ){
            const fetchData = await fetch(`http://localhost:8080/login`,{
              method : "POST",
              headers : {
                "content-type" : "application/json"
              },
              body : JSON.stringify(data)
            })
      
            const dataRes = await fetchData.json()
            console.log(dataRes)
            
            toast(dataRes.message)
            
            if(dataRes.alert){
            //   dispatch(loginRedux(dataRes))
              setTimeout(() => {
                navigate("/")
              }, 1000);
            }
      
            // console.log(userData)
          }
          else{
              alert("Please Enter required fields")
          }
        }
  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex  flex-col p-4'>
            <h5 className='text-center text-2xl font-bold'>Log in</h5>
            <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
                <img className='' src="" alt="" />
            </div>
            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type={"email"} id='email'name='email'value={data.email} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-2 rounded  focus-within:outline-blue-500
                '/>
                <label htmlFor="password">Password</label>
                <div className='flex px-2 py-2 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-500'>
                    <input type={showPassword ? "text" : "password"} id='password'name='password'value={data.password} onChange={handleOnChange} className=' w-full bg-slate-200 border-none outline-none 
                    '/>
                    <span className='flex text-xl' onClick={handleShowPassword}>{showPassword ?<BiShow/>:<BiHide/>}</span>
                </div>         
                <button type='submit' className='w-full max-w-[150px] text-white text-xl font-medium text-center py-1 rounded-full mt-4 m-auto bg-red-500 hover:bg-red-600 cursor-pointer'>Login</button>
            </form>
            <p className='text-left text-sm mt-2 '>You still do not have an account? <Link to={'/signUp'} className='text-red-500 underline'>Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Login