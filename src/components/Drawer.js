import React from "react";
import AppContext from "../context";
import Info from "./info";
import axios from "axios";
function Drawer({onCloseCart, items =[], onRemove} ) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  // const [orderID, setOrderID] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {setCartItems} = React.useContext(AppContext);
  const {cartItems} = React.useContext(AppContext);
  const {totalPrice} = React.useContext(AppContext);

  
  const onClickOrder = async ()  => {
    setIsLoading(true);
    for (const item of cartItems) {
        const orderItem = {
          id: item.id,
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price
        };
        await axios.post('http://localhost:3000/orderItems', orderItem);
        //  axios.delete(`https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart/${item.id}`)
      }
   
    setCartItems([]);
    setIsOrderComplete(true);
    setIsLoading(false);
  }


  return(
    <div className="overlay">        
      <div className="drawer">
        <h3>Корзина <img onClick={onCloseCart} width={32} height={32} src="/img/btn-delete.svg" className="btnDelete" alt="Delete"/></h3>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
          <div className="PCI">
            {items.map((item) => (
              <div className="cartItems">
              <div className="cartItem d-flex align-center">
                <div style={{ backgroundImage: `url(${item.imageUrl})`}}className="imgItems"></div>
                <div className="text_cart">
                  <p>{item.title}</p>
                  <b>{item.price} Руб.</b>
                </div>
                <img  
                onClick={() => onRemove(item.id)} 
                width={32} 
                height={32} 
                src="/img/btn-delete.svg" 
                className="btnRemove" 
                alt="Delete"/>
              </div>  
              </div>
            ))}
        </div>
        
            <div className="cartResult">
            <ul className="cartTotalBlock">
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{totalPrice} Руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>{totalPrice * 0.05} Руб.</b>
              </li>
            </ul>
        
        <button className="greenButton" disabled={isLoading} onClick={onClickOrder}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
        </div> 
        </div>):
        <Info 
        image={isOrderComplete ? 'img/order-complete.svg' : 'img/clear-cart.svg'} 
        title={isOrderComplete ? 'Заказ оформлен!' :'Корзина пуста!'} 
        description={isOrderComplete ? 'Ваш заказ #18 скоро будет передан курьерской доставке' : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}/>
        } 
      </div>
    </div>
  );
}

export default Drawer;
