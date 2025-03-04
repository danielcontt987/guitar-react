// import { useState } from "react"
import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db";


function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }
  //Definir el state
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart());

  //useEffect
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  ,[cart]);

  //fuctions
  function addToCart(item) {
    const exist = cart.findIndex((i) => i.id === item.id);
    if (exist >= 0) {
      const updatedCart = [...cart];
      updatedCart[exist].quantity += 1;
      setCart(updatedCart);
    }else{
      item.quantity = 1;
      setCart((cart) => [...cart, item]);
    }
  }

  function removeToCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

  function increaseToCard(id) {
    const exist = cart.findIndex((i) => i.id === id);
    const updatedCart = [...cart];
    updatedCart[exist].quantity += 1;
    setCart(updatedCart);
  }

  function decreaseToCard(id) {
    const exist = cart.findIndex((i) => i.id === id);
    const updatedCart = [...cart];
    updatedCart[exist].quantity -= 1;
    setCart(updatedCart);
    if (updatedCart[exist].quantity === 0) {
       removeToCart(id);
    }
  }

  function removeAllCart() {
    setCart([]);
  }

 
  return (
  <>
      <Header
        cart={cart}
        removeToCart={removeToCart}
        increaseToCard={increaseToCard}
        decreaseToCard={decreaseToCard}
        removeAllCart={removeAllCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar
                key={guitar.id} 
                guitar={guitar}
                setCart={setCart} 
                addToCart={addToCart}
              />
            ))}
          </div>
      </main>
      
      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
  </>
  )
}

export default App
