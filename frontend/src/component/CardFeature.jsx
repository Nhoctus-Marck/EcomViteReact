import React from "react";
import { Link } from "react-router-dom";
const CardFeature = ({ image, price, category, name, loading ,id}) => {
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        // {() =>window.scrollTo({top:"0",behavior:"smooth"})} Efecto Smooth al clickear otro item
        <>
        <Link to={`/menu/${id}`} onClick={() =>window.scrollTo({top:"0",behavior:"smooth"})}> 
          <div className="h-28 flex x-col justify-center items-center">
            <img src={image} className="h-full" alt="" />
          </div>
          <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
            {name}
          </h3>
          <p className=" text-slate-500 font-medium">{category}</p>
          <p className=" font-bold">
            <span className="text-red-500">$</span>
            <span>{price}</span>
          </p>
          <button className="bg-orange-400 py-1 my-2 mt-2 rounded hover:bg-yellow-600 w-full">
            Add Cart
          </button>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
