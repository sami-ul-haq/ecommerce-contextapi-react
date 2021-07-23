import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
    filterState: { byStock, byFastDelivery, sort, byRating , searchQuery} 
  } = useContext(CartContext);

  const filteredProducts = () => {

    let sortedProducts = products;

    if(sort){
      sortedProducts = sortedProducts.sort((a,b)=>(
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      ))
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if(searchQuery){
      sortedProducts = sortedProducts.filter(prod=>(
        prod.name.toLowerCase().includes(searchQuery)
      ))
    }


    return sortedProducts;

  }


  return (
    <div className="home">
      <Filters />

      <div className="product-container">
        {filteredProducts().map((product) => (
          <SingleProduct product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
