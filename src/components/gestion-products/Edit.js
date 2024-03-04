import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [produit, setProduit] = useState({
    nom: "",
    price: "",
    categorieId: "",
    image: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadProduitEtCategories = async () => {
      try {
        const resultProduit = await axios.get(`http://localhost:7777/produits/${id}`);
        const resultCategories = await axios.get("http://localhost:7777/categories");

        setProduit({
          nom: resultProduit.data.libelle,
          price: resultProduit.data.prix,
          categorieId: resultProduit.data.categorie ? resultProduit.data.categorie.id.toString() : "Non classé",
          image: resultProduit.data.image,
        });
        setCategories(resultCategories.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    loadProduitEtCategories();
  }, [id]);

  const onInputChange = (e) => {
    setProduit({ ...produit, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduit = {
        libelle: produit.nom,
        prix: parseFloat(produit.price),
        categorie: {
          id: parseInt(produit.categorieId)
        },
        image: produit.image,
      };

      const response = await axios.put(`http://localhost:7777/produits/${id}`, updatedProduit);
      console.log("Réponse du serveur :", response.data);
      navigate("/produits");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit :", error);
    }
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Modifier Produit</h2>

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Entrer le nom du produit"
                    name="nom"
                    value={produit.nom}
                    onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Prix
                </label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Entrer le prix du produit"
                    name="price"
                    value={produit.price}
                    onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image (URL)
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Entrer l'URL de l'image du produit"
                    name="image"
                    value={produit.image}
                    onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categorieId" className="form-label">
                  Catégorie
                </label>
                <select
                    className="form-control"
                    name="categorieId"
                    value={produit.categorieId}
                    onChange={onInputChange}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.libelle}
                      </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-outline-primary">
                Soumettre
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/produits">
                Annuler
              </Link>
            </form>
          </div>
        </div>
      </div>
  );
}
