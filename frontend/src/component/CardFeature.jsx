import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";
const CardFeature = ({ image, price, category, name, loading ,id}) => {
  const dispatch = useDispatch()
  const handleAddCartProduct = (id)=>{
    dispatch(addCartItem({
      _id : id,
      name: name,
      price : price,
      category: category,
      image: image
    }))
  }
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-gradient-to-t from-800 to-400 hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        // {() =>window.scrollTo({top:"0",behavior:"smooth"})} Efecto Smooth al clickear otro item
        <>
        <Link to={`/menu/${id}`} onClick={() =>window.scrollTo({top:"0",behavior:"smooth"})}> 
          <div className="h-28 flex x-col justify-center items-center ">
            <img src={image} className="h-full rounded-sm" alt="" />
          </div>
          <h3 className="font-semibold text-100 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
            {name}
          </h3>
          {/* <p className=" text-400 font-medium">{category}</p> */}
          <p className=" font-bold">
            <span className="text-950">$</span>
            <span>{price}</span>
          </p></Link>
          <button className="bg-900 py-1 my-2 mt-2 rounded hover:bg-950 w-full text-50 " onClick={handleAddCartProduct}>
            Add Cart
          </button>
          
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
