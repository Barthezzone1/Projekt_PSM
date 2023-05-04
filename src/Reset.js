import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import { Card, Form, Button } from "react-bootstrap";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center">Password Reset</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="w-100 mt-3"
              onClick={() => sendPasswordReset(email)}
            >
              Send password reset email
            </Button>
          </Form>
          <div className="mt-3">
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Reset;