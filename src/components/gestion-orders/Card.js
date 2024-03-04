import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Card() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  };

  const updateCartInLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const removeFromCart = () => {
    const updatedCart = [];
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <h3>Produits commandés:</h3>
        <button className="btn btn-danger mb-3" onClick={clearCart}>Vider le panier</button>
        <table className="table border shadow">
          <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Libellé</th>
            <th scope="col">Prix</th>
            <th scope="col">Quantité</th>

            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                        src={item.image}
                        alt={item.type}
                        className="image-styling"
                        width="50"
                        height="50"
                    />
                  </td>
                  <td>{item.libelle}</td>
                  <td>{item.prix}</td>
                  <td>{item.quantite}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => removeFromCart(item)}>Supprimer</button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
        <Link className="btn btn-outline-primary" to="/customer-home">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}