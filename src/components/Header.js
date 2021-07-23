import React from "react";
import { useContext } from "react";
import {
  Container,
  Navbar,
  FormControl,
  Nav,
  Dropdown,
  Badge,
  Button
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import { Link } from "react-router-dom";
import { CartContext } from "../context/Context";

const Header = () => {

  const { state: {cart} , dispatch , filterState , filterDispatch} = useContext(CartContext);

  return (
    <Navbar bg="dark" varient="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Sole Shop</Link>
        </Navbar.Brand>
        <Navbar.Text>
          <FormControl placeholder="Search Product" className="m-auto" onChange={(e)=>filterDispatch({
            type: "FILTER_BY_SEARCH",
            payload: e.target.value
          })}/>
        </Navbar.Text>
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle varient="success">
              <FaShoppingCart />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((product) => (
                    <span className="cartitem" key={product.id}>
                      <img
                        src={product.image}
                        className="cartItemImg"
                        alt={product.name}
                      />
                      <div className="cartItemDetail">
                        <span>{product.name}</span>
                        <span>Rs {product.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product.id,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
