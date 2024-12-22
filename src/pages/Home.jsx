import React from 'react'
import Card from '../components/Card'
import AppContext from '../context'


function Home({searchValue, onChangeSearchInput, setSearchValue, onAppToCart, onAddFavorite,  isLoading}) {
    
    const {items, isItemAdded, cartItems, favoriteItems} = React.useContext(AppContext);
    const filteredItems = items.filter((item => item.title.toLowerCase().includes(searchValue.toLowerCase())))
    
    const renderItems = () => {
      return(isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
            <Card
            key={index}
            {...item}
            onFavorite={(item) => onAddFavorite(item)}
            onPlus={(item) => onAppToCart(item)} 
            added={!isLoading && item && isItemAdded(item.id)}
            // addedFavorite={favoriteItems.some(obj => Number(obj.id) === Number(item.id))}
            loading = {isLoading}
          />
          ))
    }
    
    return  (
    <div>
        <div className="content">
        <h1>Все кроссовки</h1>
        <div className="search">
          
          {searchValue && <img onClick={() => setSearchValue('')} width={32} height={32} src="/img/btn-delete.svg" className="removeSearch" alt="Delete"/>}
          <img src="/img/search.svg" className="search-icon" alt="searchImg"/>
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск"></input>
        </div>
        </div>
      
        <div className='sneakers'>
          {renderItems()}
        </div>
        </div>
        )
}

export default Home;