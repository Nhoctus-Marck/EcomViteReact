import React from 'react'
import { Link } from 'react-router-dom'
const HomeCard = ({name,image,category,price,loading ,id}) => {
  return (
    <div>
        <div className='bg-gradient-to-t from-800 to-400 shadow-md p-2 rounded w-44 min-w-[150]  hover:border-800 hover:border-2'>
           {
            name ? (<> {/* Otro modelo de caja <div className='bg-white shadow-md p-2 rounded'></div> */}
            <Link to={`/menu/${id}`} onClick={() =>window.scrollTo({top:"0",behavior:"smooth"})}>
            <div className=' w-40 min-h-[150px]'>
                <img src={image} alt="" className='h-full w-full'/>
            </div>
            <h3 className='font-semibold text-100 text-center capitalize text-lg'>{name}</h3>
            <p className='text-center text-400 font-medium'>{category}</p>
            <p className='text-center font-bold'><span className='text-950'>$</span><span>{price}</span></p>
            </Link>
            </>          
            )
            :<div className='flex justify-center items-center h-full'>
              <p>{loading}</p>
            </div>
            
           }
        </div>
    </div>
  )
}

export default HomeCard