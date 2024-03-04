import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddCategory() {
    const navigate = useNavigate();

    const [categorie, setCategorie] = useState({libelle: ""});

    const { libelle } = categorie;

    const onInputChange = (e) => {
        setCategorie({ ...categorie, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!libelle) {
            alert("Veuillez saisir le nom de la catégorie.");
            return;
        }

        await axios.post("http://localhost:7777/categories", { libelle });
        navigate("/categories");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Ajouter une Catégorie</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="libelle" className="form-label">
                                Nom de la Catégorie
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom de la catégorie"
                                name="libelle"
                                value={libelle}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-primary">
                            Soumettre
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/categories">
                            Annuler
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
