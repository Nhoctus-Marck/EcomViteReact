import React, { useState } from 'react'
import { BsUpload } from "react-icons/bs";
import { ImageToBase64 } from '../utility/imageToBase64';
import { toast } from 'react-hot-toast';

const NewProduct = () => {
  const [data,setData] = useState({
    name:"",
    category:"",
    image:"",
    price :"",
    description:""
  })
  const hangleOnChange =(e) =>{
    const {name,value} = e.target
    setData((preve) =>{
      return{
        ...preve,
        [name] : value
      }
    })
  }
  const uploadImage = async (e) =>{
    const data = await ImageToBase64(e.target.files[0])
    
    setData((preve)=>{
      return{
          ...preve,
          image: data
      }
  })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    

     const {name,image,category,price} = data
    if(name && image && category && price){
      const fetchData = await fetch(`http://localhost:8080/uploadProduct`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body : JSON.stringify(data)
    })
    const fetchRes =  await fetchData.json()
    console.log(fetchRes)
    toast(fetchRes.message) 
    setData(()=>{
      return{
        name:"",
        category:"",
        image:"",
        price :"",
        description:""
      }
    })
    }else{
      toast("Enter Require Fields") 
    }
  }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md p-4 shadow flex flex-col py-3 pg-white' onSubmit={handleSubmit} >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" className='bg-slate-200 p-1' onChange={hangleOnChange} value={data.name}/>

        <label htmlFor="category">Category</label>
        <select className='bg-slate-200 p-1 my-1 'id="category" name="category" onChange={hangleOnChange} value={data.category}>
        <option value={"other"}>Select Category</option>
          <option value={"jackets"}>Jackets</option>
          <option value={"sneakers"}>Sneakers</option>
          <option value={"t-shirts"}>T-shirts</option>
          <option value={"accessories"}>Accessories</option>
          <option value={"pants"}>Pants</option>
        </select>
        <label htmlFor="image">Image
                <div className="h-40 w-full bg-slate-200 my-3 rounded flex items-center justify-center cursor-pointer overflow-hidden">
                  <span className='text-5xl'>{data.image? <img className='h-full w-full' src={data.image} alt="" /> : <BsUpload/>}</span>
                </div>
                <input type={"file"} id='image' accept='image/*' className='hidden' onChange={uploadImage}/>
        </label>

        <label htmlFor="price" className='my-1'>Price</label>
        <input type={"text"} name="price" id="" className='bg-slate-200 p-1'onChange={hangleOnChange} value={data.price}/>

        <label htmlFor="description">Description</label>
        <textarea  name='description' cols="30" rows={2} className='bg-slate-200 p-1 resize-none'onChange={hangleOnChange}value={data.description}></textarea>
        <button className='bg-red-500 hover:bg-red-600 my-2 text-white text-lg font-medium drop-shadow-sm'>Save</button>
      </form>
     

    </div>
  )
}

export default NewProduct