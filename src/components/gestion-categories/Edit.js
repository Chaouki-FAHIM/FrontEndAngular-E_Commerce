import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [categorie, setCategorie] = useState({
        libelle: '',
    });

    const { libelle } = categorie;

    const onInputChange = (e) => {
        setCategorie({ ...categorie, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const loadCategorie = async () => {
            const result = await axios.get(`http://localhost:7777/categories/${id}`);
            setCategorie(result.data);
        };
        loadCategorie();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:7777/categories/${id}`, categorie);
        navigate('/categories');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Modifier la Catégorie</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="libelle" className="form-label">
                                Libellé
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Entrer le nouveau libellé"
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
