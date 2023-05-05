import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth, db, collection} from './firebase'; 
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle, BiCartAlt, BiCheckCircle, BiInfoCircle } from "react-icons/bi";
import Card from "./Card";
import { getDocs } from 'firebase/firestore';
import Click from "./audioclip/click.mp3"
const pattern = [200, 100];

const Home = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    playVibration()
    navigate("/checkout", { state: { basket: basket }});
    new Audio(Click).play();
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
      playVibration()
    }).catch((error) => {
      // An error happened.
    });
    new Audio(Click).play();
  }

  const handleHistory = () => {
      navigate("/history")
      playVibration()
      new Audio(Click).play();
  }

  const [productsList, setProductsList] = useState([]);
  const [basket, setBasket] = useState([]);
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const calculateBasketTotal = () => {
    return basket.reduce((total, product) => total + product.price, 0);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, 'products');
      const productSnapshot = await getDocs(productsCol);
      const productsList = productSnapshot.docs.map(doc => doc.data());
      console.log(productsList);
      setProductsList(productsList);
    }
    fetchProducts();
  }, []);

  const handleAddToBasket = (product) => {
    setBasket(prevBasket => [...prevBasket, product]);
    new Audio(Click).play();
  }

  const handleClearBasket = () => {
    setBasket([]);
    new Audio(Click).play();
  }

  const handleToggleBasket = () => {
    setIsBasketVisible(prevIsVisible => !prevIsVisible);
    new Audio(Click).play();
  }

  const playVibration = () => {
    navigator.vibrate(pattern)
  }

  return (
    <>
      <nav>
        <p id='polecane'>
          Polecane Produkty
        </p>
        <div>
          <button class="btn btn-primary" onClick={handleToggleBasket}>View Basket ({basket.length}) <BiCartAlt /></button>
          <button class="btn btn-danger" onClick={handleClearBasket}>Clear Basket</button>
        </div>

        {isBasketVisible && (
          <div>
            <h2>Basket Contents</h2>
            {basket.map((product, index) => (
              <div key={index}>
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            ))}
            <p>Total: {calculateBasketTotal()}</p>
          </div>
        )}

        <div className="container">
          <div className="row">
            {productsList.map((product, index) => (
              <div style={{ marginBottom: "20px" }}>
                <Card
                  key={index}
                  title={product.name}
                  images={product.image}
                  price={product.price}
                  onAddToBasket={() => handleAddToBasket(product)}
                />
              </div>
            ))}
          </div>
        </div>
        <button className="dashboard__btn" onClick={handleLogout}style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "#888" }}>
          <BiLogOutCircle /> Logout
        </button>
        <button className="dashboard__btn" onClick={handleCheckout} style={{ position: "absolute", top: "10px", right: "100px", backgroundColor: "#0F0" }}>
          <BiCheckCircle /> Checkout
        </button>
        <button className="dashboard__btn" onClick={handleHistory} style={{ position: "absolute", top: "10px", right: "205px", backgroundColor: "#0FF" }}>
          <BiInfoCircle /> History
        </button>
      </nav>
    </>
  )
}

export default Home;
