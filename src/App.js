import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap"
import Navbar from 'react-bootstrap/Navbar';


function App() {
  return (
    <>
       <Navbar bg="dark" variant="dark" className="textcentre">
        <Container>
          <Navbar.Brand href="/home">
            <img
              alt=""
              src="/icon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            BARĆ
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </Container>
    </>
    


  );
}

export default App;