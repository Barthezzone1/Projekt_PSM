import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
<<<<<<< HEAD
import { auth, db, collection } from './firebase';
=======
import { auth, db, collection} from './firebase'; 
>>>>>>> 412b17acbc322122a9acb37072d8cd47a59d385e
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle, BiCartAlt } from "react-icons/bi";
import Card from "./Card";
import { getDocs } from 'firebase/firestore';

const Home = () => {
<<<<<<< HEAD
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
            setProductsList(productsList);
        }
        fetchProducts();
    }, []);

    const handleAddToBasket = (product) => {
        setBasket(prevBasket => [...prevBasket, product]);
    }

    const handleClearBasket = () => {
        setBasket([]);
    }

    const handleToggleBasket = () => {
        setIsBasketVisible(prevIsVisible => !prevIsVisible);
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
                            <Card
                                key={index}
                                title={product.name}
                                images={product.images}
                                price={product.price}
                                onAddToBasket={() => handleAddToBasket(product)} // pass the handleAddToBasket function as a prop
                            />
                        ))}
                    </div>
                </div>
                <button className="dashboard__btn" onClick={handleLogout} style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "#888" }}>
                    <BiLogOutCircle /> Logout
                </button>
            </nav>
        </>
    )
}

export default Home;
=======
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
      setProductsList(productsList);
    }
    fetchProducts();
  }, []);

  const handleAddToBasket = (product) => {
    setBasket(prevBasket => [...prevBasket, product]);
  }

  const handleClearBasket = () => {
    setBasket([]);
  }

  const handleToggleBasket = () => {
    setIsBasketVisible(prevIsVisible => !prevIsVisible);
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
              <Card
                key={index}
                title={product.name}
                images={product.images}
                price={product.price}
                onAddToBasket={() => handleAddToBasket(product)} // pass the handleAddToBasket function as a prop
              />
            ))}
          </div>
        </div>
        <button className="dashboard__btn" onClick={handleLogout} style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "#888" }}>
          <BiLogOutCircle /> Logout
        </button>
      </nav>
    </>
  )
}

export default Home;
>>>>>>> 412b17acbc322122a9acb37072d8cd47a59d385e
