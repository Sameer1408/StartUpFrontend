import React from 'react'
import InsideOrderListing from './InsideOrderListing';

function OrderListingCompo(props) {
    const {orderItems,totalAmount,createdAt} = props.order;
    const {cart} = orderItems;
    const {cartItems} = cart;
    let date = String(createdAt).slice(0,10);
  //  console.log(cartItems);
    return (
        <div style={{border:"2px solid black",margin:"20px 0px"}}>
        Odered On  : {date}
        {
            cartItems.map((e)=>{
            return <InsideOrderListing order={e} />
            })
        }
        Total Amount : Rs{totalAmount}
        </div>
    )
}

export default OrderListingCompo
