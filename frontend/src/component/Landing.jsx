import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";

const Landing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the product list when the component mounts
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await axios.get("https://bhagwati-industries.onrender.com/products");
      setProducts(response.data);
      console.log("Product", response.data[0].imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Product List
        </h1>
        <Home products={products} />
      </div>
    </>
  );
};

export default Landing;
