import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + +action.item.price;
    const itemExists = state.items.find((item) => item._id === action.item._id);
    if (itemExists) {
      return { items: state.items, totalAmount: state.totalAmount };
    }
    const updatedItemList = [...state.items, action.item];
    return {
      items: updatedItemList,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const updatedTotalAmount = state.totalAmount - +action.price;
    const updatedItemList = state.items.filter(
      (item) => item._id !== action.id
    );
    return {
      items: updatedItemList,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return initialState;
  }
  return initialState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id, price) => {
    dispatchCartAction({ type: "REMOVE", id, price });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
