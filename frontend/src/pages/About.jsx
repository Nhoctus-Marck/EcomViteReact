import React from 'react'
import { useSelector } from 'react-redux'

const About = () => {
  const ProdList = useSelector((state)=>state.product.productList)
  const {name,image,category,price} = ProdList[0]
  return (
    <div className='p-2 md:p-4 '>
      <div className='rounded-lg bg-slate-600 w-full hover:shadow-sky-400 hover:shadow-sm  min-w-[200px] max-w-[200px] hover:border hover:bg-gradient-to-r from-pink-600 to-purple-600'>
      <img src={image} alt="" />
        <div className=''>
            <div className=' bg-gray-400 skew-y-11 max-w-[72px] rounded-sm translate-x-32 flex justify-center'>
              <p className=' text-yellow-400 capitalize font-semibold overflow-hidden whitespace-nowrap '>{category}</p>
           </div>
        </div>
        <div className='bg-slate-800'>
          <p className='font-semibold text-white flex justify-center'>{name}</p>
        </div>
        <div className='flex justify-around text-white font-semibold'>
          <p>Price : {price}</p>
        </div>
        
      </div>
      </div>
  )
}

export default About