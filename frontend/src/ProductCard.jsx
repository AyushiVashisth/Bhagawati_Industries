import React, { useState } from "react";

const ProductCard = ({ product, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    onUpdate(editedProduct);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <div className="border rounded-md p-4 m-4">
      {isEditing ? (
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="imageUrl"
            value={editedProduct.imageUrl}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
          <button onClick={handleSaveEdit} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Save
          </button>
          <button onClick={handleCancelEdit} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="text-xl font-semibold">{product.name}</div>
          <div className="text-gray-600">{product.description}</div>
          <div className="text-gray-800">${product.price}</div>
          <img src={product.imageUrl} alt={product.name} className="mt-2" />
          <div className="flex mt-4 space-x-2">
            <button onClick={handleEditClick} className="bg-blue-500 text-white px-2 py-1 rounded-md">
              Edit
            </button>
            <button onClick={() => onDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
