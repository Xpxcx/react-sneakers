import Card from "../components/Card";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import AppContext from "../context";
function Orders() {
    const [orderItems, setOrderItems] = React.useState([]);
    const {onAppToCart, onAddFavorite} = React.useContext(AppContext);

    React.useEffect(() => {
       (async () => {
        const {data} = await axios.get('http://localhost:3000/orderItems');
        setOrderItems(data);
       })();
    }, []);

    return  (
    <div className="favoriteItem">
        {orderItems.length > 0 ? (
          <div>
            
          <h1>Мои Заказы</h1>
          <Link to='/'>
                <button className="back-to-Home"  width='35' height='35'>
                    <img src="/img/back-to-Home-img.svg"  alt="back"/>
                </button>
            </Link>
            <div className='sneakers'>
              {orderItems.map((item) => (
                <Card 
                  key={item.id}
                  {...item}
                  onFavorite={(item) => onAddFavorite(item)}
                  onPlus={(item) => onAppToCart(item)} 
                  
                />
                ))}
              </div>
          </div>
        ) : (
          // <div className="wrapperNoLiked">
          <div className="noLiked">
            <img width={70} height={70} src="/img/order-img.svg" alt=""></img>
            <div className="descrNoLiked">
              <h1>Заказов пока нет</h1>
              <p>Закажите что нибудь и они появятся!</p>
              <Link to="/">
              <button><img src="/img/back.svg" alt="back"></img>Вернуться назад</button></Link>
            </div>
        </div>
        // </div>
        )}
    </div>
        )
}
export default Orders;