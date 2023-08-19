import React, {useState} from 'react'
import { Routes, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Review from "./components/review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  const [user , setUser] = useState(null)
  async function log_in(user = null){
    setUser(user)
  }
  async function logout(){
    setUser(null)
  }
  return (
    <div className="App">
       <Navbar bg="light" data-bs-theme="light">
          <Navbar.Brand > Movie Reviewe </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to ={"/movies"} > Movies </Link>
            </Nav.Link>
            <Nav.Link> {user ?(
              <a onClick={logout}>{user.name}</a>
            ):(<Link to={"/login"}>Login</Link> )}
            </Nav.Link>
          </Nav>
          </Navbar.Collapse>
      </Navbar>  
      <Routes>
        <Route exact path="/" element={< MoviesList />}/>

        <Route path="/movies" element={< MoviesList />}/>    
        <Route path="/movies/:id/review" element={< Review user={user} /> }/>
            
        <Route path="/movies/:id/" element={< Movie user={user} />}/>
        <Route path="/login" element={< Login log_in={log_in} user={user} />}/>
      </Routes>
    </div>
  );
}

export default App;
