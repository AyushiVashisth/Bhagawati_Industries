import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import axios from "axios";

const Admin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the product list when the component mounts
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
      console.log("Product", response.data[0].imageUrl);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Product List</h1>
      <AddProduct refreshProductList={fetchProductList} />
      <ProductList products={products} refreshProductList={fetchProductList} />
    </div>
  );
};

export default Admin;
