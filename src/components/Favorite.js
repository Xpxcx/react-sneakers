import React from 'react';
function Favorite({items =[], onRevome, onBack}) {
    return (
        
    <div className='favorite'>
        <button onClick={onBack}>
            <img src="/img/backFavorite.svg" alt=""/></button>
        <h1 className='titleFavorite'>Мои закладки</h1>
        {items.map((item)=> 
        <div className='favoriteCard'>
            <div className="card">
        <img width={133} height={112} src={item.imageUrl} alt='CartImg'/>
        <h5>{item.title}</h5>
        <div className="descr">
            <p>Цена:</p>
            <b>{item.price}</b>
        </div>
    </div></div>
            
    )}
    </div>    
    )

}

export default Favorite;