import React, { useState } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import { useRef } from "react";
import CardFeature from "../component/CardFeature";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import { useEffect } from "react";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);

  const homeProductCartList = productData.slice(0, 4);
  const homeProductCartListTshirts = productData.filter(
    (el) => el.category === el.category,
    []
  );
  console.log(homeProductCartListTshirts);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  const categoryList = [...new Set(productData.map(el => el.category))];
  console.log(categoryList);

  ///filter data display
  const [filterby,setFilterBy] = useState("")
  const [dataFilter,setDataFilter]= useState([])

  useEffect(() => {
    setDataFilter(productData)
  },[productData])
  
  
  const handleFilterProduct = (category) =>{
    setFilterBy(category)
    const filter = productData.filter((el) => el.category.toLowerCase() === category.toLowerCase())
    setDataFilter(() => {
      return [...filter];
    })
  }
 ////////////////////////
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img src="" alt="" className="h-7" />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The clothing store that has everything you need in{" "}
            <span className="text-orange-400 text">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            similique autem, id dolor, illo ipsum hic explicabo vel quibusdam
            voluptatum, et excepturi ducimus voluptatibus minus enim ab omnis
            amet. Numquam.
          </p>
          <button className="font-bold bg-orange-500 text-slate-200 px-4 py-2 rounded-md">
            Buy Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index} loading={"loading..."} />;
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            New Clothes
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-500 hover:b-slate-400 text-lg p-1 rounded"
            >
              <GrFormPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-500 hover:b-slate-400 text-lg p-1 rounded"
            >
              <GrFormNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListTshirts[0]
            ? homeProductCartListTshirts.map((el) => {
                return (
                  <CardFeature
                    key={el.id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => {
                return <CardFeature key={index} loading={"loading..."} />;
              })}
        </div>
      </div>
      <div className="my-5">
        <h2 className="font-bold text-2xl text-slate-800 mb-4">
          Your Products
        </h2>
        <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
          {categoryList[0] &&
            categoryList.map((el) => {
              return <FilterProduct category={el} onClick={() => handleFilterProduct(el)}/>;
            })}
        </div>
          <div className="flex flex-wrap justify-center gap-4 my-4">
            {dataFilter[0]?
              dataFilter.map((el) =>{
                return(
                  <CardFeature
                  key={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}/>
                )
              })
              :loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading..." key={index+"allProduct"} />
              ))
            }
          </div>
      </div>
    </div>
  );
};

export default Home;
