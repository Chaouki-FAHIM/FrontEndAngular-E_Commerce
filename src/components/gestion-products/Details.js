import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';

export default function DetailsProduct() {
  const [produit, setProduit] = useState({
    libelle: "",
    price: "",
    categorie: null,
    image: "",
    date: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const loadProduit = async () => {
      try {
        const resultProduit = await axios.get(`http://localhost:7777/produits/${id}`);
        setProduit({
          libelle: resultProduit.data.libelle,
          price: resultProduit.data.prix,
          categorie: resultProduit.data.categorie ? resultProduit.data.categorie.id.toString() : "Non classé",
          image: resultProduit.data.image,
          date: moment(resultProduit.data.date).format('YYYY/MM/DD HH:mm:ss'),
        });

        if (resultProduit.data.categorie) {
          const resultCategorie = await axios.get(`http://localhost:7777/categories/${resultProduit.data.categorie.id}`);
          setProduit(prevProduit => ({
            ...prevProduit,
            categorie: resultCategorie.data
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du produit :", error);
      }
    };

    loadProduit();
  }, [id]);

  return (
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center">Détails du produit</h3>
              </div>
              <div className="card-body">
                <img src={produit.image} alt={produit.libelle} className="img-fluid mb-3" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Libellé :</strong> {produit.libelle}
                  </li>
                  <li className="list-group-item">
                    <strong>Prix :</strong> {produit.price} Dhs
                  </li>
                  <li className="list-group-item">
                    <strong>Catégorie :</strong> {produit.categorie?.libelle || 'Catégorie non définie'}
                  </li>
                  <li className="list-group-item">
                    <strong>Date :</strong> {produit.date}
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/produits" className="btn btn-primary mt-3">
              Retour à la liste
            </Link>
          </div>
        </div>
      </div>
  );
}
