import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTodo from "./create-todo"
import EditTodo from "./edit-todo"
import TodosList from "./todos-list"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <nav className= "navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className = "navbar-brand"> MERN-Stack Todo App </Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link"> Todos </Link>
                 </li>
                 <li className="navbar-item">
                  <Link to="/create" className="nav-link"> Create Todo </Link>
                 </li>
               </ul>
            </div>
        </nav>
        </div>
                <Route path="/" exact component= {TodosList} />
        <Route path="/edit/:id" component = {EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </Router>
    );
  }
}

export default App;
