import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  let navigate = useNavigate();

  const [produit, setProduit] = useState({
    nom: "",
    price: "",
    categorieId: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
        .get("http://localhost:7777/categories")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error(
              "Erreur lors de la récupération des catégories :",
              error
          );
        });
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProduit({ ...produit, [name]: value });
  };

  const { nom, price, categorieId, image } = produit;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !price || !categorieId || !image) {
      alert("Veuillez remplir tous les champs avant de soumettre le formulaire.");
      return;
    }

    const newProduit = {
      nom,
      price,
      image,
      categorie: {
        id: categorieId,
      },
    };

    try {
      await axios.post("http://localhost:7777/produits", newProduit);
      navigate("/produits");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du produit:", error);
      alert("Une erreur est survenue lors de l'enregistrement du produit.");
    }
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Enregistrer le produit</h2>

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="categorie" className="form-label">
                  Catégorie
                </label>
                <select
                    className="form-control"
                    id="categorie"
                    name="categorieId"
                    value={categorieId}
                    onChange={onInputChange}
                    required
                >
                  <option value="">Choisissez une catégorie</option>
                  {categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.libelle}
                      </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Libellé
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Entrer le libellé du produit"
                    name="nom"
                    value={nom}
                    onChange={onInputChange}
                    required
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
                    value={price}
                    onChange={onInputChange}
                    required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Entrer l'URL de l'image du produit"
                    name="image"
                    value={image}
                    onChange={onInputChange}
                    required
                />
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
