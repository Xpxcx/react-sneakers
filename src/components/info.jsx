import React from "react";
import AppContext from "../context";
function Info({image, title, description}) {
    const {setCartOpened} = React.useContext(AppContext);
    return (
        <div className="clearCart">
          <img src={image} alt="clear-cart"></img>
          <h1>{title}</h1>
          <div className="textClearCart">
            <p>{description}</p>
          </div>
          <button 
            onClick={() => setCartOpened(false)} 
            className="back">
            <img src="img/back.svg" alt="backButton"/>  Вернуться назад 
          </button>
        </div>
    )
}

export default Info;