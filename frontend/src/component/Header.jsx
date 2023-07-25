import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import {HiOutlineUserCircle} from 'react-icons/hi'
import {BsCartFill} from 'react-icons/bs'
import { useSelector , useDispatch} from 'react-redux'
import {logoutRedux} from "../redux/userSlice"
import {toast} from "react-hot-toast"
import {BiSearch} from "react-icons/bi"
import { searchFilter } from "../redux/productSlice";
import {useEffect} from 'react';
import Home from '../pages/Home'


const Header = () => {
  const dispatch = useDispatch()
  const stateSearch = useSelector((state) => state.product.searchItem);
  
    // Search
    const [searchData,setSearchData] = useState("")

    function handleSubmitSearch(e){
      e.preventDefault()
      setSearchData(e.target.value)
      dispatch(searchFilter(searchData))
    }
    
    const [showMenu,setShowMenu] = useState(false)
    const userData = useSelector((state)=>state.user)

    const handleShowMenu = () =>{
        setShowMenu(preve => !preve)
    }
    const handleLogout = ()=>{
      dispatch(logoutRedux())
      window.sessionStorage.clear()
      toast("Logout Successfully")
    }
    useEffect(() => {
      const keyDownHandler = event => {
        
  
        if (event.key === 'Enter' && window.location.pathname === "/") {
          event.preventDefault();
          console.log('User pressed: ', event.key);
          document.location.href = '/clotheslist'
        }
      };
  
      document.addEventListener('keydown', keyDownHandler);
  
      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }, [Home]);

    const cartItemNumber = useSelector((state) =>state.product.cartItem)
    const LoginSessUser = window.localStorage.getItem('token')
    const LoginSessUserImage = window.localStorage.getItem('image')
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
          <div className="h-10 flex items-center gap-4 md:gap-7">
            <div className='h-10 md:gap-7'>
              <Link to={""}>
                <img src={logo} className="h-full" />
              </Link>
            </div>
            <div className="flex gap-4 md:gap-1 bg-gray-200 w-80 h-8 items-center rounded-md hover:bg-gray-300">  
              <BiSearch className='w-10'/>
              <form action="" onSubmit={handleSubmitSearch}>
                <input  type="text" id='searchData'name="searchData" className='bg-gray-200 w-64 h-6 hover:bg-gray-300 rounded-md focus:outline-none' onChange={(e)=> handleSubmitSearch(e)}  placeholder='Search Clothes' />
              </form>
              
            </div>
          </div>     
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"clotheslist"}>Search</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
          <Link to={"cart"}><BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
              {cartItemNumber.length}
            </div>
          </Link>
          </div>
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
             {userData.image || LoginSessUserImage ? <img src={userData.image || LoginSessUserImage} className='h-full w-full'/> : <HiOutlineUserCircle />}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {
                   userData.email && LoginSessUser  === "Ejem2@gmail.com" || LoginSessUser === "Ejem2@gmail.com" ? <Link to={'newProduct'} className="whitespace-nowrap cursor-pointer">New product</Link> : ""
                }
                {
                  userData.email || LoginSessUser ? <p className='cursor-pointer text-white px-2 bg-red-500' onClick={handleLogout}>Logout</p> : <Link to={'login'} className="whitespace-nowrap px-2 cursor-pointer">Login</Link>
                }
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                <Link to={""} className='px-2 py-1'>Home</Link>
                <Link to={"clotheslist"}>Search</Link>
                <Link to={"about"}className='px-2'>About</Link>
                <Link to={"contact"}className='px-2'>Contact</Link>
                </nav>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header