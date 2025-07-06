import React, { Component, createRef } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, addItem, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import "../App.css";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.nodeRefs = {};
  }

  componentDidMount() {
    this.props.getItems();
  }

  getNodeRef = (id) => {
    if (!this.nodeRefs[id]) {
      this.nodeRefs[id] = createRef();
    }
    return this.nodeRefs[id];
  };

  render() {
    const { items } = this.props;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="Shopping-list">
            {items.map((item) => {
              const id = item._id || item.id; // Use _id first, then fallback to id
              const nodeRef = this.getNodeRef(id);
              return (
                <CSSTransition
                  key={id}
                  timeout={300}
                  classNames="fade"
                  nodeRef={nodeRef}
                  unmountOnExit
                >
                  <ListGroupItem ref={nodeRef} className="list-group-item">
                    <span>{item.name}</span>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => this.props.deleteItem(id)}
                    >
                      &times;
                    </Button>
                  </ListGroupItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
});

export default connect(mapStateToProps, { getItems, addItem, deleteItem })(
  ShoppingList
);
