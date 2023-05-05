import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { db, collection} from './firebase'; 

const Checkout = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const { basket } = state;

    const getTotal = (basket) => {
        let total = 0;
        for (let i = 0; i < basket.length; i++) {
          total += parseFloat(basket[i].price);
        }
        return total.toFixed(2);
    };
    
    const handleReturn = () => {
        navigate("/home");
    }

    const getItemsList = (basket) => {
        const itemsList = basket.map((item) => ({
           name: item.name,
           price: item.price
        }));
        return itemsList;
    };  

    const itemsList = getItemsList(basket);
    const [total, setTotal] = useState(0); // add state variable for total
    var tarif = 0;

    function applyDiscount(tarif) {
        if (tarif === 1) {
          return 10;
        } else if (tarif === 2) {
          return 20;
        } else {
          return 0;
        }
    }

    useEffect(() => { // use useEffect to call API and update total
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            // Wywołanie API Nominatim w celu uzyskania informacji o kraju na podstawie współrzędnych
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
                .then(response => response.json())
                .then(data => {
                    var country = data.address.country;
                    // Sprawdzenie, czy użytkownik znajduje się w Polsce
                    if (country === "Poland" || "Polska") {
                        console.log("Użytkownik znajduje się w Polsce");
                        tarif +=1;
                        console.log(tarif);
                    } else {
                        console.log("Użytkownik nie znajduje się w Polsce");
                        tarif +=2;
                        console.log(tarif);
                    }

                    // Dodanie zniżki do wartości tarif
                    const discount = applyDiscount(tarif);
                    const newTotal = parseFloat(getTotal(basket)) + discount;
                    setTotal(newTotal.toFixed(2));
                });

        });
    }, [basket]); // run effect when basket prop changes

    return (
        <>
            <div class="container-lg">
                <h1 class="display-1 text-center">Checkout</h1>
                <div className="row">
                    {basket.map((basket, index) => (
                        <div key={index} className="col-md-15 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{basket.name}</h5>
                                    <p className="card-text">{basket.price}</p>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h2>Your total is: {total}</h2>
                <button class="btn btn-success btn-lg" onClick={handleReturn}>Pay Now </button>
            </div>
        </>
    )
}

export default Checkout;
