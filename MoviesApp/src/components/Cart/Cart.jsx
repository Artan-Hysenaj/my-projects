import React, { useContext } from "react";
import {
  Button,
  ListGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../context/cart-context";
const Cart = (props) => {
  const context = useContext(CartContext);
  const { items, totalAmount, clearCart } = context;

  return (
    <Modal isOpen={props.showCart} toggle={props.onHideCart}>
      <ModalHeader toggle={props.onHideCart}>Cart</ModalHeader>
      <ModalBody>
        <ListGroup style={{ maxHeight: "450px", overflow: "scroll" }}>
          {items.length !== 0
            ? items.map((item) => {
                return (
                  <CartItem
                    id={item._id}
                    key={item._id}
                    title={item.title}
                    price={item.price}
                  />
                );
              })
            : "No items in your cart"}
        </ListGroup>
      </ModalBody>
      <ModalFooter>Total: {totalAmount.toFixed(2)}$</ModalFooter>
      <ModalFooter className="d-flex justify-content-between">
        <Button color="warning" onClick={clearCart}>
          Clear Cart
        </Button>
        <div>
          <Button
            color="success"
            onClick={() => console.log("Order Button Clicked")}
          >
            Order
          </Button>
          <Button className="ms-2" onClick={props.onHideCart}>
            Close
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default Cart;
