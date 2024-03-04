import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function VisitorHome() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    loadProduits();
  }, []);

  const loadProduits = async () => {
    const result = await axios.get("http://localhost:7777/produits");
    setProduits(result.data);
  };

  const chunkArray = (myArray, chunkSize) => {
    let index = 0;
    const arrayLength = myArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      const myChunk = myArray.slice(index, index + chunkSize);
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  const rowsOfProducts = chunkArray(produits, 3);

  return (
      <div className='container'>
        <div className='py-4'>
          <h1 className="text-center mb-4">Bienvenue dans notre boutique</h1>
          <h2 className="text-center mb-4">Matériels Informatique</h2>
          {rowsOfProducts.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {produits.map((produit, index) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch" key={index}>
                      <div className="card mb-3 shadow" style={{ width: "18rem" }}>
                        <Link to={`/detail-produit/${produit.id}`}>
                          <img src={produit.image} className="card-img-top img-fluid product-image" alt={produit.libelle} style={{ height: "200px" }} />
                        </Link>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{produit.libelle}</h5>
                          <p className="card-text">
                            Prix:<b> {produit.prix} Dhs</b>
                          </p>
                          <div className="mt-auto">
                            <Link className="btn btn-outline-primary mx-2" to="/login">Commander</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}

              </div>
          ))}
        </div>
      </div>
  );
}
