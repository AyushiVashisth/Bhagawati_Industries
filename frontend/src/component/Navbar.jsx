import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import logo from "../component/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogo = () => {
    navigator("/");
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://bhagwati-industries.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        // Successful login
        setShowModal(false);
        setEmail("");
        setPassword("");
        toast.success("Login successful"); // Display success toast
        navigator("/admin");
      } else {
        // Failed login
        setShowModal(false);
        toast.error("Invalid email or password"); // Display error toast
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="bg-[#779be7] p-4 flex justify-between items-center">
        <div onClick={handleLogo}>
          <img src={logo} alt="logo" className="w-[25%]" />
        </div>
        {/* <h1 className="text-white font-bold text-2xl">Bhagawati Industries</h1> */}
        <div className="text-black text-xl">
          <FaUser onClick={handleLoginClick} className="cursor-pointer" />
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
              <form onSubmit={handleLoginFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Login
                  </button>
                </div>
              </form>
              <button
                className="text-red-500 mt-4 hover:underline cursor-pointer block mx-auto"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </nav>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Navbar;
