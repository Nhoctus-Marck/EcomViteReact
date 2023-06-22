import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/cartProduct'
// import CartProduct from "../component/cartProduct";
import EmptyCartImg from "../../src/assets/empty.png"
import { toast } from 'react-hot-toast'
import {loadStripe} from "@stripe/stripe-js"
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const productCartItem = useSelector((state)=>state.product.cartItem)
    // console.log(productCartItem)
    const totalPrice = productCartItem.reduce((acc,curr)=>acc +parseInt(curr.total),0)
    const totalQty = productCartItem.reduce((acc,curr)=>acc +parseInt(curr.qty),0)
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()

    

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
              Payment
            </button>
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