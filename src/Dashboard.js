import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Card } from "react-bootstrap";
import { BiLogOutCircle } from "react-icons/bi";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
      <Card bg="secondary" text="white">
          <Card.Body>
            <Card.Title>Logged in as:</Card.Title>
            <Card.Subtitle>{name}</Card.Subtitle>
            <Card.Text>{user?.email}</Card.Text>
          </Card.Body>
        </Card>
        <button
          className="dashboard__btn"
          onClick={handleLogout}
          style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "#888" }}
        >
          <BiLogOutCircle /> Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;