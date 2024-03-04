import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Utilisateur from "../../model/Utilisateur";

export default function Register() {
  let navigate = useNavigate();

  const [user,setUser] = useState(new Utilisateur());

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user.nom || !user.prenom || !user.adresse || !user.email || !user.passwd) {
      alert("Veuillez remplir tous les champs avant de soumettre le formulaire.");
      return;
    }

    await axios.post("http://localhost:7777/register", user);
    navigate("/login");
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Inscription</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Username" for="first-name" className="form-label">Nom</label>
                <input
                    type="text"
                    className="form-control"
                    id="first-name"
                    placeholder="Entrer votre nom"
                    name="nom"
                    value={user.nom}
                    onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Prenom" for="last-name" className="form-label">
                  Prénom
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="last-name"
                    placeholder="Entrer votre prénom"
                    name="prenom"
                    value={user.prenom}
                    onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Adress" for="adress" className="form-label">Adresse</label>
                <input
                    type="text"
                    className="form-control"
                    id="adress"
                    placeholder="Entrer votre adresse"
                    name="adress"
                    value={user.adresse}
                    onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Email" for="email" className="form-label">E-mail</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Entrer votre adresse éléctronique"
                    name="email"
                    value={user.email}
                    onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Passwd" for="password" className="form-label">
                  Mot de passe
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Entrer votre mot de passe"
                    name="passwd"
                    value={user.passwd}
                    onChange={(e) => onInputChange(e)}
                />
              </div>

              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/login">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
  );
}
