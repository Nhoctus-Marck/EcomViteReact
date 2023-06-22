import Header from "./component/Header"
import { Outlet } from "react-router-dom"
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from "react";
import {setDataProduct} from "./redux/productSlice"
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const productData  = useSelector((state)=>state.product)
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`http://localhost:8080/product`)
      const resData = await res.json()
      // console.log(resData);
      dispatch(setDataProduct(resData))
    })()
  },[])

  // console.log(productData)
  return (
    <div>
      <Toaster/>
      <div className="">
        <Header/>
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet/>
        </main>
      </div>
    </div>
    
  )
}

export default App
