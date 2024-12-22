import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';
function Card({id, title, imageUrl, price, onPlus, onFavorite, loading}) {
    
    const {isItemAdded} = React.useContext(AppContext);
    const{isFavoriteAdded} = React.useContext(AppContext);
    const onClickPlus = () =>   {
        onPlus({id, title, imageUrl, price});
    }

    const onClickFavorite = ()  =>  {
        onFavorite({id, title, imageUrl, price});
    }
    
    return(
        
    <div className={styles.card}>
        {
        loading ? 
        <ContentLoader 
            speed={2}
            width={211}
            height={252}
            viewBox="0 0 211 252"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"   
        >
            <rect x="0" y="0" rx="10" ry="10" width="160" height="112" /> 
            <rect x="0" y="141" rx="3" ry="3" width="133" height="15" /> 
            <rect x="0" y="162" rx="0" ry="0" width="76" height="15" /> 
            <rect x="0" y="224" rx="10" ry="10" width="63" height="24" /> 
            <rect x="125" y="221" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
        : 
            <>
                <div className={styles.buttonLike} onClick={onClickFavorite}>
                    <img src={isFavoriteAdded(id) ? '/img/liked.svg' : '/img/heart-unliked.svg' }alt="buttonHeart"/>
                </div>
                <img width={133} height={112} src={imageUrl} alt='CartImg' />
                <h5>{title}</h5>
                <div className={styles.descr}>
                    <p className={styles.p}>Цена:</p>
                    <b className={styles.b}>{price}</b>
                </div>
                <div className={styles.buttonPlus} onClick={onClickPlus}>
                    <img src={isItemAdded(id) ? '/img/btnChecked.svg' : '/img/btn-plus-on.svg'} alt="buttonPlus"/>
                </div>  
            </>
          
        }
    </div>
    );
}

export default Card;