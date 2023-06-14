import React from 'react'
import {GiClothes} from "react-icons/gi"

const FilterProduct = ({category,onClick}) => {
  return (
    <div onClick={onClick}>
        <div className="text-3xl bg-orange-400 p-5 rounded-full cursor-pointer">
            <GiClothes/>
        </div>
        <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div> 
  )
}

export default FilterProduct