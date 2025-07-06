import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModel from "./components/ItemModel";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModel />
          {/* The ShoppingList component will display the list of items */}
          {/* It will also allow adding and deleting items */}
          <ShoppingList />
        </Container>
      </div>
    );
  }
}

export default App;
