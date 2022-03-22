import React, { useContext } from "react";
import {
  Button,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import CartContext from "../../../context/cart-context";
import classes from "./CartItem.module.css";
const CartItem = (props) => {
  const cartContext = useContext(CartContext);
  return (
    <ListGroupItem className={classes.list}>
      <div>
        <ListGroupItemHeading>{props.title}</ListGroupItemHeading>
        <ListGroupItemText>{props.price}$</ListGroupItemText>
      </div>
      <Button
        className="btn-close"
        onClick={() => cartContext.removeItem(props.id, props.price)}
      ></Button>
    </ListGroupItem>
  );
};

export default CartItem;
