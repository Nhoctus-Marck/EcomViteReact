import React, { useState } from 'react'
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const AllProduct = ({heading}) => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map(el => el.category))];
    const loadingArrayFeature = new Array(10).fill(null);
    // console.log(categoryList);

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
  return (
    <div className="my-5">
        <h2 className="font-bold text-2xl text-slate-800 mb-4">
            {heading}
        </h2>
        <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
          {categoryList[0] ?
            categoryList.map((el) => {
              return <FilterProduct key={el} category={el} onClick={() => handleFilterProduct(el)}/>;
            })
            :
            <div className="flex justify-center items-center h-full">
              <p>loading...</p>
            </div>
          }
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
                  category={el.category}
                  id={el._id}/>
                )
              })
              :loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading..." key={index+"allProduct"} />
              ))
            }
          </div>
      </div>
  )
}

export default AllProduct