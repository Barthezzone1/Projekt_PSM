import React from 'react';
import { signOut } from "firebase/auth";
import { auth, db } from './firebase'; 
import { useNavigate } from 'react-router-dom';
import "./App.css"
import Card from "./Card";
import { getProducts } from "./firebase.js"
import { CollectionReference, getFirestore } from 'firebase/firestore';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    const products = getProducts();

    console.log(products);

    return (
        <>
            <nav>
                <p>
                    Strona główna
                </p>
                <div className="container">
                    <div className="row">
                        <Card
                        title= ""
                        images="../images/"
                        price="30"
                        dollar="$"
                        exp_date="10-08-2022"
                        />
                        <Card
                        title="Gówno"
                        images="../images/"
                        price="30"
                        dollar="$"
                        exp_date="10-08-2022"
                        />
                        <Card
                        title="Sraka"
                        images="../images/"
                        price="30"
                        dollar="$"
                        exp_date="10-08-2022"
                        />
                        <Card
                        title="Rzyg"
                        images="../images/"
                        price="30"
                        dollar="$"
                        exp_date="10-08-2022"
                        />
                    </div>
                </div>

                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default Home;