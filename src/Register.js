import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "./firebase";
import { Card, Button, Form } from "react-bootstrap";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);

    return (
        <div className="register">
            <Card className="register__container">
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Group>
                        <div class="my-3"></div>
                        <div class="d-grid gap-2">
                            <Button
                                variant="primary"
                                type="button"
                                className="w-100"
                                onClick={register}
                            >
                                Register
                            </Button>
                            <Button
                                variant="primary"
                                type="button"
                                className="register__google, w-100"
                                onClick={signInWithGoogle}
                            >
                                Register with Google
                            </Button>
                        </div>

                    </Form>

                    <div className="register__login-link">
                        Already have an account? <Link to="/">Login</Link> now.
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Register;