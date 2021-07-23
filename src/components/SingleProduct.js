import React from "react";
import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { CartContext } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ product }) => {
  const { id, name, image, price, fastDelivery, ratings, inStock } = product;
  const {
    state: { cart }, dispatch
  } = useContext(CartContext);

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={image} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <span>Rs {price.split(".")[0]}</span>
          {fastDelivery ? <div>Fast Delivery</div> : <div>4 days delivery</div>}
          <Rating rating={ratings} />
          <Card.Subtitle style={{ paddingBottom: 10 }}></Card.Subtitle>

          {cart.some((p) => p.id === id) ? (
            <Button variant="danger" onClick={()=>dispatch({type: "REMOVE_FROM_CART", payload: id})}>Remove from Cart</Button>
          ) : (
            <Button disabled={!inStock} onClick={()=>dispatch({type: "ADD_TO_CART", payload: product})}>
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
