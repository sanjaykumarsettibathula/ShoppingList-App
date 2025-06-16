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
          <TransitionGroup className="Shopping-list" component={null}>
            {items.map((item) => {
              const id = item.id || item._id; // Fallback if id is undefined
              const nodeRef = this.getNodeRef(id);
              return (
                <CSSTransition
                  key={id}
                  timeout={500}
                  classNames="fade"
                  nodeRef={nodeRef}
                >
                  <ListGroupItem ref={nodeRef}>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => this.props.deleteItem(id)}
                    >
                      &times;
                    </Button>
                    {item.name}
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
