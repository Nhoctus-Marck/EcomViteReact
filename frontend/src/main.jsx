import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Menu from "./pages/Menu"
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NewProduct from './pages/NewProduct'
import SignUp from './pages/SignUp'
import {store} from './redux/index'
import {Provider} from 'react-redux'
import Cart from './pages/Cart'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      {/* <Route path='menu' element={<Menu/>}/> */}
      <Route path='menu/:filterby' element={<Menu/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='newProduct' element={<NewProduct/>}/>
      <Route path='signUp' element={<SignUp/>}/>
      <Route path='cart' element={<Cart/>}/>
    </Route >
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
