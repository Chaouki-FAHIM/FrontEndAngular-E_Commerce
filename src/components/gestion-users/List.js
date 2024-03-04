import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function ListUsers() {
 
    const [users,setUsers]=useState([]);

    useEffect( ()=>{
        loadUsers();
    },[]
    );

    const loadUsers = async ()=> {
        const result = await axios.get("http://localhost:7777/utilisateurs");
        setUsers(result.data); 
    };
    const deleteUser = async (id) => {
      await axios.delete(`http://localhost:7777/utilisateur/${id}`);
      loadUsers();
    };


  return (
    <div className='container'>
        <div className='py-4'>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Rôle</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mot de passe</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    users.map((user,index)=>(

                    <tr>
                      <th scope="row" key={index}>{index+1}</th>
                      <td>{user.nom}</td>
                      <td>{user.prenom}</td>
                      <td>{user.adress}</td>
                      <td>{user.usertype}</td>
                      <td>{user.email}</td>
                      <td>{user.passwd}</td>
                      <td>
                        <Link className="btn btn-primary mx-2" to={`/detail-user/${user.id}`}>View</Link>
                        <Link className="btn btn-outline-primary mx-2" to={`/edit-user/${user.id}`}>edit</Link>
                        <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.id)}>delete</button>
                      </td>
                    </tr>



                    ))
                }
              </tbody>
            </table>
            <Link className="btn btn-success" to="/ajout-user">
              Ajouter un utilisateur
            </Link>
            <Link className="btn btn-outline-secondary mx-2" to="/admin-home">
              Menu des gestions
            </Link>
        </div>
    </div>
  );
}
