import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome() {
  const buttonStyle = {
    marginBottom: '10px',
    width: '30%', // Ajoutez cette propriété pour que les boutons occupent toute la largeur
  };

  return (
    <div>
        <br></br>        <br></br>

      <h2>Menu Admin</h2>
      <div>
      <br></br> <br></br>
        <ul style={{listStyle: 'none', padding: 0}}>

          <li style={{marginBottom: '10px'}}>
            <Link className="btn btn-success" to="/users" style={buttonStyle}>
              Gestion Utilisateurs
            </Link>
          </li>
          <li style={{marginBottom: '10px'}}>
            <Link className="btn btn-success" to="/produits" style={buttonStyle}>
              Gestion Produits
            </Link>
          </li>

          <li style={{marginBottom: '10px'}}>
            <Link className="btn btn-success" to="/categories" style={buttonStyle}>
              Gestion Catégories
            </Link>
          </li>

          <li style={{marginBottom: '10px'}}>
            <Link className="btn btn-outline-secondary" to="/login" style={buttonStyle}>
              Log Out
            </Link>
          </li>

        </ul>
        <br></br>
        <br></br>
        <br></br>


      </div>
    </div>
  );
}
