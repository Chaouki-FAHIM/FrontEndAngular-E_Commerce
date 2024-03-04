import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const Cart = ({ cart, removeFromCart }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validCart = () => {
        setIsLoading(true);
        setError('');

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('Utilisateur non connecté');
            setIsLoading(false);
            return;
        }

        // Construire la structure de la commande
        const commande = {
            utilisateur_id: 3,
            produits: cart.map(item => ({ id: item.id, quantite: item.quantite }))
        };

        axios.post('http://localhost:7777/commandes', commande)
            .then(response => {
                console.log('Commande créée avec succès:', response.data);
                cart.forEach(item => removeFromCart(item));
            }).catch(error => {
            console.error('Erreur lors de la création de la commande:', error);
            setError('Erreur lors de la validation du panier');
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className='col-md-4'>
            <div className='py-4'>
                <h2 className='text-center'>Panier</h2>
                {cart.map((item, index) => (
                    <div className="card mb-3 shadow" key={index} style={{width: "27rem"}}>
                        <div className="row g-0 align-items-center justify-content-center">
                            <div className="col-md-4">
                                <img src={item.image} className="img-fluid rounded-start product-image"
                                     alt={item.libelle} style={{height: "8.5rem"}}/>
                            </div>
                            <div className="col-md-5">
                                <div className="card-body text-center">
                                    <p className="card-title" style={{fontSize: '0.9rem'}}><b>{item.libelle}</b></p>
                                    <p className="card-text" style={{fontSize: '1rem'}}>{item.prix} Dhs</p>
                                    <p className="card-subtitle" style={{fontSize: '0.6rem'}}>Quantité
                                        : {item.quantite}</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-danger" onClick={() => removeFromCart(item)}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="btn btn-outline-success m-lg-3" onClick={validCart} disabled={isLoading}>
                    {isLoading ? 'Validation en cours...' : 'Valider'}
                </button>
                <Link to='/card-product' className='btn btn-primary'>Voir le panier</Link>
                {error && <div className='text-danger'>{error}</div>}
            </div>
        </div>
    );
};

export default Cart;
