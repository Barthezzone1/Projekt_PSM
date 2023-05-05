import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth, db, collection} from './firebase'; 
import { useNavigate } from 'react-router-dom';
import "./Home.css"
import Card from "./Card";
import { CollectionReference, getFirestore, getDocs } from 'firebase/firestore';

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

  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, 'products');
      const productSnapshot = await getDocs(productsCol);
      const productsList = productSnapshot.docs.map(doc => doc.data());
      setProductsList(productsList);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <nav>
        <p>
          Strona główna
        </p>
        <div className="container">
          <div className="row">
            {productsList.map((product, index) => (
              <Card
                key={index}
                title={product.title}
                images={product.images}
                price={product.price}
                dollar={product.dollar}
                exp_date={product.exp_date}
              />
            ))}
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
