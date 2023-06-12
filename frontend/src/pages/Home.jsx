import React from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'

const Home = () => {
  const productData = useSelector((state)=>state.product.productList)
  console.log(productData)
  const homeProductCartList = productData.slice(1,5)
  return (
    <div className='p-2 md:p-4'>
      <div className="md:flex gap-4 py-2">
        <div className='md:w-1/2'>
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src="" alt="" className='h-7' />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>The clothing store that has everything you need in <span className='text-orange-400 text'>Your Home</span></h2>
          <p className='py-3 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam similique autem, id dolor, illo ipsum hic explicabo vel quibusdam voluptatum, et excepturi ducimus voluptatibus minus enim ab omnis amet. Numquam.</p>
          <button className='font-bold bg-orange-500 text-slate-200 px-4 py-2 rounded-md'>Buy Now</button>
        </div>  
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {
            homeProductCartList[0] && homeProductCartList.map(el =>{
              return(
                <HomeCard
                key={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}/>
              )
            })
          }
          
        </div>
        <div className="">
          <h2 className="font-bold text-2xl text-slate-800">New Clothes</h2>
          <div className="">
            Cart Component
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home