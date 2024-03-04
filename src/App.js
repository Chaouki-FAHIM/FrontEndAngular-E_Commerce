import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/authentification/Login";
import AdminHome from "./components/home/AdminHome";
import CustomerHome from "./components/home/CustomerHome";
import Register from "./components/authentification/Register";
import VisitorHome from "./components/home/VisitorHome";

import Footer from "./components/layout/Footer";
import Card from "./components/gestion-orders/Card";

import ListCategories from "./components/gestion-categories/List";
import DetailsCategory from "./components/gestion-categories/Details";
import AddCategory from "./components/gestion-categories/Add";
import EditCategory from "./components/gestion-categories/Edit";

import ListProducts from "./components/gestion-products/List";
import DetailsProduct from "./components/gestion-products/Details";
import AddProduct from "./components/gestion-products/Add";
import EditProduct from "./components/gestion-products/Edit";

import ListUsers from "./components/gestion-users/List";
import AddUser from "./components/gestion-users/Add";
import EditUser from "./components/gestion-users/Edit";
import DetailsUser from "./components/gestion-users/Details";
import Show from "./components/gestion-products/Show";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br />

        <Routes>

          # Page d'acceuil
          <Route exact path="/" element={<VisitorHome />} />
          <Route exact path="/admin-home" element={<AdminHome />} />
          <Route exact path="/customer-home" element={<CustomerHome />} />

          #Authentification
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          # gestion des produits
          <Route exact path="/produits" element={<ListProducts />} />
          <Route exact path="/ajout-produit" element={<AddProduct />} />
          <Route exact path="/edit-produit/:id" element={<EditProduct/>} />
          <Route exact path="/detail-produit/:id" element={<DetailsProduct />} />
          <Route exact path="/show-produit/:id" element={<Show />} />

          # gestion des catégories
          <Route exact path="/categories" element={<ListCategories />} />
          <Route exact path="/ajout-categorie" element={<AddCategory/>} />
          <Route exact path="/edit-categorie/:id" element={<EditCategory />} />
          <Route exact path="/detail-categorie/:id" element={<DetailsCategory />} />
          
          # gestion des users
          <Route exact path="/users" element={<ListUsers />} />
          <Route exact path="/ajout-user" element={<AddUser />} />
          <Route exact path="/edit-user/:id" element={<EditUser />} />
          <Route exact path="/detail-user/:id" element={<DetailsUser />} />


          <Route exact path="/card-product" element={<Card />} />

        




        </Routes>
      </Router>
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
}

export default App;
