import React from 'react';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';


function App() {
  const [items, setItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);


  
  React.useEffect(() => {
   async function fetchData() {
    const cartResponse = await axios.get('https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart');
    const itemsResponse = await axios.get('https://6740a8b5d0b59228b7f0e3c0.mockapi.io/items');
    const favoriteResponse = await axios.get('http://localhost:3000/favorite');
    
    setIsLoading(false);

    setCartItems(cartResponse.data);
    setItems(itemsResponse.data);
    setFavoriteItems(favoriteResponse.data);
  }
    fetchData();   
  },  [])
  

  const onRemoveItem = (id) => {
    axios.delete(`https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id) ));
  }
  const onAppToCart = (obj) => {
    try { 
      const checkCart = cartItems.some(item => Number(item.id) === Number(obj.id));
      if(!checkCart)
      {
        setCartItems(prev => [...prev, obj]);
        axios.post('https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart', obj)
      }
      else{
        axios.delete(`https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id) ));
      }
    }
      catch(error){
        alert('Не удалось добавить в корзину');
      }
  };
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  
  const onAddFavorite = async (obj) => {
    try {
    const checkFavorite = favoriteItems.some(item => Number(item.id) === Number(obj.id));
    if(!checkFavorite)
    {   
      const favoriteItem = {
        id: obj.id,
        title: obj.title,
        imageUrl: obj.imageUrl,
        price: obj.price
      }
      const { data } = await axios.post('http://localhost:3000/favorite', favoriteItem);
      setFavoriteItems(prev => [...prev, data]);
    }
    if(checkFavorite){
      setFavoriteItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      axios.delete(`http://localhost:3000/favorite/${obj.id}`);
    }
    }
    catch(error)  {
      alert('Не удалось добавить в закладки')
    }
    };


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  
  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }
  const isFavoriteAdded = (id) => {
    return favoriteItems.some(obj => Number(obj.id) === Number(id))
  }
  
  return (
    <AppContext.Provider value={{items, cartItems, isItemAdded, isFavoriteAdded, setCartOpened, setCartItems, onAppToCart, onAddFavorite, favoriteItems, totalPrice}}>
    <div className="wrapper">
     {cartOpened && <Drawer
      items={cartItems}
      onCloseCart={() => setCartOpened(false)}
      onRemove={onRemoveItem}/>}
      <Header
      onClickCart={() => setCartOpened(true)} 
      />

<Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAppToCart={onAppToCart}
              onAddFavorite={onAddFavorite}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              onAddFavorite={onAddFavorite}
              onAppToCart={onAppToCart}
            />
          }
        />
        <Route
        path='/orders'
        element={
          <Orders/>
        }/>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
