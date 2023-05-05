import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Checkout from "./Checkout";
import { Container } from "react-bootstrap"
import Navbar from 'react-bootstrap/Navbar';


function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="textcentre">
        <Container>
          <Navbar.Brand href="/Home">
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
<<<<<<< HEAD
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/reset" element={<Reset />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/home" element={<Home />} />
            </Routes>
          </Router>
        </div>
      </Container>
=======
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/checkout" element={<Checkout />}/>
          </Routes>
        </Router>
      </div>
    </Container>
>>>>>>> 412b17acbc322122a9acb37072d8cd47a59d385e
    </>



  );
}

export default App;