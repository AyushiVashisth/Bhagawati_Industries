//ProductList.jsx
import React, { useState } from "react";
import axios from "axios";
import EditProductModal from "./EditProductModal";

const ProductList = ({ products, refreshProductList }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const handleEdit = (product) => {
    setEditMode(true);
    // Populate the form with the product data when in edit mode
    setEditedProduct({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.imageUrl, // Use the current product's image URL
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedProduct({
      _id: "",
      name: "",
      description: "",
      price: "",
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setEditedProduct({ ...editedProduct, image: imageFile });
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("description", editedProduct.description);
      formData.append("price", editedProduct.price);
      if (editedProduct.image) {
        formData.append("image", editedProduct.image);
      }

      // Replace with your API endpoint
      await axios.put(
        `https://bhagwati-industries.onrender.com/products/${editedProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditMode(false);
      setEditedProduct({
        _id: "",
        name: "",
        description: "",
        price: "",
        image: null,
      });
      refreshProductList(); // Refresh the product list after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Replace with your API endpoint
      await axios.delete(`https://bhagwati-industries.onrender.com/products/${productId}`);
      refreshProductList(); // Refresh the product list after delete
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 p-4 bg-gray-100"
        >
          {/* Image */}
          <div className="mb-4">
            <img
              src={`https://bhagwati-industries.onrender.com${product.imageUrl}`}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 text-xl mt-2">₹{product.price}</p>
          </div>

          {/* Edit/Delete Buttons */}
          <div className="flex justify-between p-4">
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Conditionally render the edit modal */}
      {editMode && (
        <EditProductModal
          editedProduct={editedProduct}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleUpdateProduct={handleUpdateProduct}
          handleCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default ProductList;
