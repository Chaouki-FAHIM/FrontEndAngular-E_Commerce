import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import Cart from '../gestion-orders/ProductCard';

export default function CustomerHome() {
  const [produits, setProduits] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nouvelle state pour vérifier la connexion

  useEffect(() => {
    loadProduits();
    loadCartFromLocalStorage();
    checkUserLogin(); // Appel à la fonction pour vérifier la connexion de l'utilisateur
  }, []);

  const loadProduits = async () => {
    const result = await axios.get("http://localhost:7777/produits");
    setProduits(result.data);
  };

  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }

  const removeFromCart = () => {
    const updatedCart = [];
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const updateCartInLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
          item.id === existingItem.id ? { ...item, quantite: item.quantite + 1 } : item
      );
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart);
      setMessage(`La quantité du produit ${product.libelle} a été augmentée dans le panier.`);
    } else {
      const updatedCart = [...cart, { ...product, quantite: 1 }];
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart);
      setMessage(`Le produit ${product.libelle} a été ajouté au panier.`);
    }
  };

  let navigate= useNavigate();

  const checkUserLogin = () => {
     const userId = localStorage.getItem('userId');
    console.log("Id : "+userId);
    if (!isNaN(userId)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      alert('Veuillez vous connecter pour accéder à cette page.');
      navigate("/");
    }
  };


  return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='py-4'>
              {message && <div className="alert alert-success">{message}</div>}
              <h1 className="text-center mb-4">Produits Disponibles</h1>
              <div className="row">
                {produits.map((produit, index) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch" key={index}>
                      <div className="card mb-3 shadow" style={{ width: "18rem" }}>
                        <Link to={`/detail-produit/${produit.id}`}>
                          <img src={produit.image} className="card-img-top img-fluid product-image" alt={produit.libelle} style={{ height: "200px" }} />
                        </Link>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{produit.libelle}</h5>
                          <p className="card-text">Catégorie: {produit.categorie?.libelle || "Non classé"}</p>
                          <p className="card-text">
                            <b>Prix: {produit.prix} Dhs</b>
                          </p>
                          <div className="mt-auto">
                            <button
                                className="btn btn-primary"
                                onClick={() => addToCart(produit)}
                            >
                              <i className="fas fa-shopping-cart"></i> Ajouter au panier
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
          <Cart cart={cart} removeFromCart={removeFromCart} />

        </div>
      </div>
  );
}
