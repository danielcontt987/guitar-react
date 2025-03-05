import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db";
export const useCart = () => {


      //State derivado
      const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
      }
      //Definir el state
      const [data] = useState(db);
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

      const total = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
      const isEmpty = useMemo(() =>cart.length === 0, [cart]);
    



    return {
        data,
        cart,
        setCart,
        addToCart,
        removeToCart,
        increaseToCard,
        decreaseToCard,
        removeAllCart,
        total, 
        isEmpty
    }
    
}