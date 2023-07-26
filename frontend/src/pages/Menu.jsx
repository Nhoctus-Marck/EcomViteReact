import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {
  const {filterby} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList)
  const productDisplay = productData.filter(el => el._id === filterby)[0]
  const handleAddCartProduct = (e)=>{
    dispatch(addCartItem(productDisplay))
  }
  const handleBuy =()=>{
    dispatch(addCartItem(productDisplay))
    navigate("/cart")
  }
  return (
    <div className='p-2 md:p-4  bg-gradient-to-t from-100 to-400'>
      {productDisplay?
      (<>
      <div className='w-full max-w-4xl m-auto md:flex  bg-50 border-500 border-[2px] rounded-xl'>
        <div className="max-w-sm  overflow-hidden w-full p-5">
          <img src={productDisplay.image} className='hover:scale-105 transition-all h-full' alt="" />
        </div>
        <div className="flex flex-col gap-2 md:translate-y-4">
          <h3 className='font-semibold text-950  capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
          <p className=' text-400 font-medium text-2xl'>{productDisplay.category}</p>
          <p className='font-bold md:text-2xl'><span className='text-950 '>$</span><span>{productDisplay.price}</span></p> 
          <div className='flex gap-3'>
            <button onClick={handleBuy} className="bg-900 py-1 my-2 mt-2 rounded  hover:bg-950 min-w-[100px] text-50">Buy</button>
            <button onClick={handleAddCartProduct} className="bg-900 py-1 my-2 mt-2 rounded  hover:bg-950 min-w-[100px] text-50">Add to Cart</button> 
          </div>
          <div className="">
            <p className='text-slate-600 font-medium'>Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related Product"}/>
      </>):<AllProduct heading={"Related Product"}/>}
    </div>
  )
}

export default Menu