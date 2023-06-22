import React from 'react'
import {GiClothes} from "react-icons/gi"

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
        <div className={`text-3xl p-5 rounded-full cursor-pointer ${isActive ? "bg-orange-800" : "bg-orange-400"}`}>
            <GiClothes/>
        </div>
        <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div> 
  )
}

export default FilterProduct