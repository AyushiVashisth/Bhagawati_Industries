import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ refreshProductList }) => {
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: null
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductData({ ...productData, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("image", productData.image);

      await axios.post("https://bhagwati-industries.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      closeModal();
      refreshProductList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={openModal}
      >
        Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="modal-content bg-white rounded-lg shadow-lg p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Add Product</h2>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Price:
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
