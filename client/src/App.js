import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModel from "./components/ItemModel";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModel />
            {/* The ShoppingList component will display the list of items */}
            {/* It will also allow adding and deleting items */}
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
