import React, { useState, useEffect } from 'react';
import { db } from './firebase'
import {

    query,
    getDocs,
    collection,
    where,


} from "firebase/firestore";
import { Card, Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ProductDisplay() {
    const { title } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productsQuery = query(collection(db, 'products'), where("name", "==", title));
            console.log(title);
            const productSnapshot = await getDocs(productsQuery);
            const productList = productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProduct(productList[0]);
        }
        fetchProduct();
    }, [title]);
    return (
        <Container>
            {product ? (
                <Card>
                    <Card.Header className="text-center">
                        <h1>{product.name}</h1>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex flex-column align-items-center">
                            <Image src={product.image} alt={product.name} className="w-75 mb-3" />
                            <p>Cena: {product.price}</p>
                            <p>{product.description}</p>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
}

export default ProductDisplay