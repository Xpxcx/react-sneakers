import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"

function Card({id, title, imageUrl, price, onPlus, favorited, onFavorite, added, favorite, loading = false}) {
    const [isAdded, setIsAdded] = React.useState(added);
    const[isFavorite, setIsFavorite] = React.useState(added);
    
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
        {
        loading ? 
            <ContentLoader 
            speed={2}
            width={150}
            height={193}
            viewBox="0 0 150 193"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            
            >
            <rect x="0" y="139" rx="3" ry="3" width="133" height="15" /> 
            <rect x="0" y="162" rx="3" ry="3" width="93" height="15" /> 
            <rect x="0" y="201" rx="8" ry="8" width="80" height="24" /> 
            <rect x="102" y="197" rx="10" ry="10" width="32" height="32" /> 
            <rect x="0" y="0" rx="10" ry="10" width="133" height="112" />
            </ContentLoader> : 
            <>
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
            </>
          
        }
    </div>
    );
}

export default Card;