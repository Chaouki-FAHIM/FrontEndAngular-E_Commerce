import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailsCategory() {
    const [categorie, setCategorie] = useState({
        matricule: "",
        libelle: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadCategorie();
    }, []);

    const loadCategorie = async () => {
        const result = await axios.get(`http://localhost:7777/categories/${id}`);
        setCategorie(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Détails de la Catégorie</h2>

                    <div className="card">
                        <div className="card-header">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Matricule : </b>
                                    {categorie.matricule}
                                </li>
                                <li className="list-group-item">
                                    <b>Libellé : </b>
                                    {categorie.libelle}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <Link className="btn btn-primary my-2" to={"/categories"}>
                        Retour
                    </Link>
                </div>
            </div>
        </div>
    );
}
