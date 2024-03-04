import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    usertype: "",
    passwd:"",
    adress:"",
  });

  const { usertype,nom,email,passwd,adress,prenom} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:7777/utilisateur/${id}`);
      setUser(result.data);
    };
    loadUser();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:7777/utilisateur/${id}`, user);
    navigate("/users");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nom" className="form-label">
                Nom
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Entrer votre nom"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Prenom" className="form-label">
                Prenom
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Entrer votre Prenom"
                name="prenom"
                value={prenom}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Adress" className="form-label">
                Adress
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Entrer votre Adress"
                name="adress"
                value={adress}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Passwd" className="form-label">
                Passwd
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your passwd"
                name="passwd"
                value={passwd}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="usertype" className="form-label">
                User Type
              </label>
              <select
                className="form-control"
                name="usertype"
                value={usertype}
                onChange={(e) => onInputChange(e)}
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
                
              </select>
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/listeusers">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
