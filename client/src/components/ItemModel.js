import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class ItemModel extends Component {
  state = {
    modal: false,
    name: "",
    suggestions: [],
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      name: "",
      suggestions: [],
    });
  };

  onChange = (e) => {
    const value = e.target.value;
    const { items } = this.props;
    // Filter suggestions based on input
    const suggestions = value
      ? items.filter(
          (item) =>
            item.name && item.name.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    this.setState({ name: value, suggestions });
  };

  onSuggestionClick = (name) => {
    this.setState({ name, suggestions: [] });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.name.trim()) return;

    try {
      await this.props.addItem({
        name: this.state.name.trim(),
      });
      this.toggle();
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  render() {
    const { name, suggestions } = this.state;
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup style={{ position: "relative" }}>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  autoComplete="off"
                  value={name}
                  onChange={this.onChange}
                />
                {/* Suggestions dropdown */}
                {suggestions.length > 0 && (
                  <ul
                    style={{
                      border: "1px solid #ccc",
                      borderTop: "none",
                      margin: 0,
                      padding: "0.5rem",
                      listStyle: "none",
                      position: "absolute",
                      background: "#fff",
                      width: "100%",
                      zIndex: 1000,
                      maxHeight: "120px",
                      overflowY: "auto",
                    }}
                  >
                    {suggestions.map((s) => (
                      <li
                        key={s._id || s.id}
                        style={{ cursor: "pointer", padding: "2px 0" }}
                        onClick={() => this.onSuggestionClick(s.name)}
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                )}
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items.items || [],
});

export default connect(mapStateToProps, { addItem })(ItemModel);
