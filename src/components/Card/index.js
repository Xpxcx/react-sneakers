import React from 'react';
import styles from './Card.module.scss';

function Card({id, title, imageUrl, price, onPlus, favorited, onFavorite}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const[isFavorite, setIsFavorite] = React.useState(favorited)
    
    const onClickPlus = () =>   {
        onPlus({id, title, imageUrl, price});
        setIsAdded(!isAdded);
    }



    const onClickFavorite = ()  =>  {
        setIsFavorite(!isFavorite);
        onFavorite({id, title, imageUrl, price});
    }
  
    return(
    <div className={styles.card}>

    <div className={styles.buttonLike} onClick={onClickFavorite}>
        <img src={isFavorite ? '/img/liked.svg' : '/img/heart-unliked.svg' }alt="buttonHeart"/>
    </div>
        <img width={133} height={112} src={imageUrl} alt='CartImg' />
    <h5>{title}</h5>

    <div className={styles.descr}>
        <p className={styles.p}>Цена:</p>
        <b className={styles.b}>{price}</b>
    </div>
    <div className={styles.buttonPlus} onClick={onClickPlus}>
        <img src={isAdded ? '/img/btnChecked.svg' : '/img/btn-plus-on.svg'} alt="buttonPlus"/>
    </div>
   
    </div>
    );
}

export default Card;