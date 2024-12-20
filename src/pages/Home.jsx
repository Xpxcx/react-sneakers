import Card from '../components/Card'
import AppContext from '../context'
function Home({items, searchValue, onChangeSearchInput, setSearchValue, onAppToCart, onRemoveFavorite, onAddFavorite, cartItems, isLoading}) {
  
    const filteredItems = items.filter((item => item.title.toLowerCase().includes(searchValue.toLowerCase())))
    
    const renderItems = () => {
      return(isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
            <Card
            key={isLoading ? index :item.id}
            {...item}
            onFavorite={(item) => onAddFavorite(item)}
            onPlus={(item) => onAppToCart(item)} 
            added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
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
          <input onChange={onChangeSearchInput} v alue={searchValue} placeholder="Поиск"></input>
        </div>
        </div>
      
        <div className='sneakers'>
          {renderItems()}
        </div>
        </div>
        )
}

export default Home;