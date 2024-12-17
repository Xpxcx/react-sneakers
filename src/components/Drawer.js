function Drawer({onCloseCart, items =[], onRemove} ) {
  return(
    <div className="overlay">        
      <div className="drawer">
        <h3>Корзина <img onClick={onCloseCart} width={32} height={32} src="/img/btn-delete.svg" className="btnDelete" alt="Delete"/></h3>
        {items.length > 0 ? (
          <div>
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
                <b>21498 Руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 Руб.</b>
              </li>
            </ul>
        
        <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
        </div> 
        </div>):
        (<div className="clearCart">
          <img src="img/clear-cart.svg" alt="clear-cart"></img>
          <h1>Корзина пуста!</h1>
          <div className="textClearCart">
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
          </div>
          <button 
            onClick={onCloseCart} 
            className="back">
            <img src="img/back.svg" alt="backButton"/>  Вернуться назад 
          </button>
        </div>)
        } 
      </div>
    </div>
  );
}

export default Drawer;
