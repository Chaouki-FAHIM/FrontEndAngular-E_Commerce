import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailsUser() {
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    passwd:"",
    adress:"",
    usertype: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  },);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:7777/utilisateur/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nom : </b>
                  {user.nom}
                </li>
                <li className="list-group-item">
                  <b>Prenom : </b>
                  {user.prenom}
                </li>
                <li className="list-group-item">
                  <b>Email : </b>
                  {user.email}
                </li>
                <li className="list-group-item">
                  <b>Passwd : </b>
                  {user.passwd}
                </li>
                <li className="list-group-item">
                  <b>User Type : </b>
                  {user.usertype}
                </li>
                <li className="list-group-item">
                  <b>adress : </b>
                  {user.adress}
                </li>
              </ul>
            </div>
          </div>
          <br></br>
          <Link className="btn btn-primary my-2" to={"/users"}>
            Back 
          </Link>
        </div>
      </div>
    </div>
  );
}