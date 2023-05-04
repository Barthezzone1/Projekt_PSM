import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Form, Card} from "react-bootstrap";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);

    const handleLogin = (e) => {
        e.preventDefault();
        logInWithEmailAndPassword(email, password);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="login">
                        <div className="login__container">
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                    />
                                </Form.Group>
                            
                                <Form.Group controlId="password">
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
                                    <Button type="submit" className="login__btn, w-100">
                                        Login
                                    </Button>
                                    <Button type="button" className="login__btn login__google , w-100" onClick={signInWithGoogle}>Login with Google</Button>
                                </div>

                            </Form>

                            <div>
                                <Link to="/reset">Forgot Password</Link>
                            </div>

                        </div>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/register">Register</Link> now.
            </div>

        </>

    );
}

export default Login;