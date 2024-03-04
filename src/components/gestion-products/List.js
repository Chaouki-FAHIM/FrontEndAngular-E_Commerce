import DynamicToast from "../layout/Toast";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./Add";

export default function ListProducts() {
    const [produits, setProduits] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        loadProduits();
    }, []);

    const loadProduits = async () => {
        const result = await axios.get("http://localhost:7777/produits");
        setProduits(result.data);
    };

    const deleteProduit = async (id) => {
        try {
            await axios.delete(`http://localhost:7777/produits/${id}`);
            loadProduits();
        } catch (error) {
            setToastMessage(error.response.data.message);
            setShowToast(true);
        }
    };

    useEffect(() => {
        let timeout;
        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false);
            }, 3000); // Hide the toast after three seconds
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [showToast]);

    return (
        <div className="container py-4">
            <div className="row">
                {produits.map((produit, index) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch" key={index}>
                        <div className="card mb-3" style={{ width: "18rem" }}>
                            <img src={produit.image} className="card-img-top img-fluid" alt={produit.libelle} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{produit.libelle}</h5>
                                <p className="card-text">Catégorie: {produit.categorie?.libelle || "Non classé"}</p>
                                <p className="card-text">
                                    <b>Prix: {produit.prix} Dhs</b>
                                </p>
                                <div className="mt-auto">
                                    <Link className="btn btn-primary" to={`/detail-produit/${produit.id}`}>
                                        Voir
                                    </Link>
                                    <Link className="btn btn-secondary mx-2" to={`/edit-produit/${produit.id}`}>
                                        Modifier
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => deleteProduit(produit.id)}>
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link className="btn btn-success" to="/ajout-produit">
                Ajouter un produit
            </Link>
            <Link className="btn btn-outline-secondary mx-2" to="/admin-home">Menu des gestions</Link>
            <DynamicToast showToast={showToast} setShowToast={setShowToast} toastMessage={toastMessage} />
        </div>
    );
}
