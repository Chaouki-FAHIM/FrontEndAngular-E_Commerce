import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DynamicToast from '../layout/Toast';

export default function ListCategories() {

    const [categories, setCategories] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        loadCategories().then(response => {
            // Traiter la réponse si nécessaire
        }).catch(error => {
            alert("Problème sur la récupération les données du catégorie");
        });
    }, []);


    const loadCategories = async () => {
        const result = await axios.get("http://localhost:7777/categories");
        setCategories(result.data);
    };

    const deleteCategorie = async (id) => {
        try {
            await axios.delete(`http://localhost:7777/categories/${id}`);
            loadCategories();
        } catch (error) {
            setToastMessage("Impossible de supprimer la catégorie car elle est associée à un produit au minimum.");
            setShowToast(true);
        }
    };

    useEffect(() => {
        let timeout;
        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false);
            }, 3000); // Masquer le toast après trois secondes
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [showToast]);

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Matricule</th>
                        <th scope="col">Libellé</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((categorie, index) => (
                        <tr key={index}>
                            <th scope="row">{categorie.id}</th>
                            <td>{categorie.matricule}</td>
                            <td>{categorie.libelle}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/detail-categorie/${categorie.id}`}>Détails</Link>
                                <Link className="btn btn-outline-primary mx-2" to={`/edit-categorie/${categorie.id}`}>Editer</Link>
                                <button className='btn btn-danger mx-2' onClick={() => deleteCategorie(categorie.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Link className="btn btn-success" to="/ajout-categorie">
                    Ajouter une catégorie
                </Link>
                <Link className="btn btn-outline-secondary mx-2" to="/admin-home">
                    Menu des gestions
                </Link>
            </div>

            <DynamicToast showToast={showToast} setShowToast={setShowToast} toastMessage={toastMessage} />

        </div>
    );
}
