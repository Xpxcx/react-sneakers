import Card from "../components/Card";
import { Link } from "react-router-dom";
import React from "react";
import AppContext from "../context";
function Favorites({onAppToCart, onAddFavorite}) {
    const {cartItems} = React.useContext(AppContext);
    
    
    return  (
    <div className="favoriteItem">
        {cartItems.length > 0 ? (
          <div>
          <h1>Мои закладки</h1>
            <div className='sneakers'>
              {cartItems.map((item) => (
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
            <img width={70} height={70} src="/img/noLikedImg.svg" alt=""></img>
            <div className="descrNoLiked">
              <h1>Закладок нет :(</h1>
              <p>Вы ничего не добавляли в закладки</p>
              <Link to="/">
              <button><img src="/img/back.svg" alt="back"></img>Вернуться назад</button></Link>
            </div>
        </div>
        // </div>
        )}
    </div>
        )
}
export default Favorites;