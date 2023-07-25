import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/cartProduct'
// import CartProduct from "../component/cartProduct";
import EmptyCartImg from "../../src/assets/empty.png"
import { toast } from 'react-hot-toast'
import {loadStripe} from "@stripe/stripe-js"
import { useHref, useNavigate } from 'react-router-dom'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from 'react'
import axios from 'axios'


const Cart = () => {
  const [preferenceId,setPreferenceId] = useState(null)
    const productCartItem = useSelector((state)=>state.product.cartItem)
    // console.log(productCartItem)
    const totalPrice = productCartItem.reduce((acc,curr)=>acc +parseInt(curr.total),0)
    const totalQty = productCartItem.reduce((acc,curr)=>acc +parseInt(curr.qty),0)
    console.log(totalQty)
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    initMercadoPago(`TEST-36e0bb28-9d58-4d27-b398-b68ff9e21586`);
    const productCartItemArr = Object.values(productCartItem);

    console.log(productCartItem.length)

    const onMercadoPBtn = ()=>{
      toast("Message : In Mercado pago, Only add product for transaction.")
    }

    const getPreference = async()=>{
      if(productCartItem.length === 1){
      const res = await axios.post("http://localhost:8080/create_preference",{
      // method : "POST",
      // headers : {
      //     "content-type" : "application/json"
      // },
      // body: JSON.stringify(productCartItem)

        //  items: productCartItemArr.map((item)=>{
        //   return{
        //     name: item.name,
        //     category:item.category,
        //     description:item.description,
        //     image:item.image,
        //     price:item.price,
        //     qty:item.qty,
        //   }}),
            name: productCartItem[0].name,
            category:productCartItem[0].category,
            description:productCartItem[0].description,
            image:productCartItem[0].image.toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5),
            price:totalPrice,
            qty:productCartItem[0].qty
         
      })
      // .then((res)=>window.location.href = res.data.response.body.init_point)
      if(res.statusCode === 500) return;

      const{ id } = await res.data
      console.log(id)
      if(id){
        setPreferenceId(id)
        toast("Redirect to payment Gateway...")
      }
    }else{
      toast("You can only add one type of product by this means of payment, please remove the other products or use another method")
    }
    }
    const handlePaymentMercadoPago = async()=>{
      const id = await getPreference()
      if(id){
        setPreferenceId(id)
      }
      toast("Redirect to payment Gateway...")
      // setTimeout(()=>{
      //   window.open(`${id}`)
      // },1000)
    }

    const handlePayment = async()=>{
      if(user.email){
      const stripePromise = await loadStripe(`pk_test_51NLcIOJD6UJJlC7rdJH3YNi5ZZ1lOe6Fs271frLnp6vRE3DXlvFxF8X09AStxkkLQXZj8aLteArSin6Jj37HCnzV0093QvqOHs`)
      // console.log("payment btn")
      const res = await fetch("http://localhost:8080/checkout-payment",{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body  : JSON.stringify(productCartItem)
      })
      if(res.statusCode === 500) return;

      const data = await res.json()
      console.log(data)

      toast("Redirect to payment Gateway...")
      stripePromise.redirectToCheckout({sessionId : data})}else{
        toast("You have not Login")
        setTimeout(()=>{
          navigate("/login")
        },1000)
      }
    }
  return (
    <>
    
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ?
        <div className="my-4 flex gap-3">
          {/* display cart items  */}
          <div className="w-full max-w-3xl ">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* total cart item  */}
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-orange-400 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price :</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">$</span> {totalPrice}
              </p>
            </div>
            <button onClick={handlePayment} className="bg-slate-500 w-full text-lg font-bold py-2 text-white hover:bg-red-500">
              Payment Stripe
            </button>
            <button onClick={getPreference} onMouseOver={()=> toast("Message : In Mercado pago, Only add product for transaction") } className="bg-slate-500 w-full text-lg font-bold py-2 text-white hover:bg-red-500">
              Payment Mercado Pago
            </button>
            {preferenceId && <Wallet initialization={{preferenceId}}/>}
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col p-9">
            <img src={EmptyCartImg} className="w-full max-w-sm rounded-xl"/>
            <p className="text-gray-500 text-3xl font-medium p-3 md:text-sm ">YOUR CART IS EMPTY</p>
          </div>
        </>
      }
      </div>
    
    </>
  )
}

export default Cart