import React from 'react';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './pages/Favorites';
function App() {
  const [items, setItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');


  
  React.useEffect(() => {
    axios.get('https://6740a8b5d0b59228b7f0e3c0.mockapi.io/items').then(res => {
      setItems(res.data);
    });
    axios.get('https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    });
    axios.get('https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    });
  },  [])

  const onRemoveItem = (id) => {
    axios.delete(`https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => item.id !== id ));
  }

  const onAppToCart = (obj) => {
      const checkCart = cartItems.some(item => item.id === obj.id);
      if(!checkCart)
      {
        setCartItems(prev => [...prev, obj]);
        axios.post('https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart', obj)
      }
      else{
        axios.delete(`https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter(item => item.id !== obj.id ));
      }

      
  };

  const onAddFavorite = (obj) => {
    try {
    const checkFavorite = cartItems.some(item => item.id === obj.id);
    if(!checkFavorite)
    {
      setCartItems(prev => [...prev, obj]);
      axios.post('https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart', obj)
    }
    else{
      axios.delete(`https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart/${obj.id}`);
      // setCartItems((prev) => prev.filter(item => item.id !== obj.id));
    }
    }
    catch(error)  {
      alert('Не удалось добавить в закладки')
    }
    };
    

  // const onRemoveFavorite = (id) => {
  //   axios.delete(`https://6740a8b5d0b59228b7f0e3c0.mockapi.io/cart/${id}`)
  //     setOnAddToFavorite.filter((item) => item.id !== id)
  // }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  
  
  return (
    
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
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              items={cartItems}
              onAddFavorite={onAddFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
