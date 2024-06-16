import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    vendor: "",
    price: "",
    sku: "",
    inventoryQuantity: "",
    alt: "",
    src: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const imagesArray = [{ alt: formData.alt, src: formData.src }];
    const variantsArray = [
      {
        price: formData.price,
        sku: formData.sku,
        inventory_quantity: formData.inventoryQuantity,
      },
    ];

    const formDataToSend = {
      title: formData.title,
      vendor: formData.vendor,
      images: imagesArray,
      variants: variantsArray,
    };

    try {
      await axios.post(
        "https://shopify-backend-three.vercel.app/api/products",
        formDataToSend
      );
      toast.success("Product created successfully!");
      setFormData({
        title: "",
        vendor: "",
        price: "",
        sku: "",
        inventoryQuantity: "",
        alt: "",
        src: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product. Please try again.");
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.title) {
      errors.title = "Title is required";
    }
    if (!data.vendor) {
      errors.vendor = "Vendor is required";
    }
    if (!data.price) {
      errors.price = "Price is required";
    }
    if (!data.sku) {
      errors.sku = "SKU is required";
    }
    if (!data.inventoryQuantity) {
      errors.inventoryQuantity = "Inventory Quantity is required";
    }
    if (!data.alt) {
      errors.alt = "Image Alt is required";
    }
    if (!data.src) {
      errors.src = "Image Src is required";
    }
    return errors;
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full border border-gray-300 rounded px-3 py-2 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label className="block mb-1">Vendor:</label>
          <input
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            className={`w-full border border-gray-300 rounded px-3 py-2 ${
              errors.vendor ? "border-red-500" : ""
            }`}
          />
          {errors.vendor && <p className="text-red-500">{errors.vendor}</p>}
        </div>

        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full border border-gray-300 rounded px-3 py-2 ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>
        <div>
          <label className="block mb-1">SKU:</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className={`w-full border border-gray-300 rounded px-3 py-2 ${
              errors.sku ? "border-red-500" : ""
            }`}
          />
          {errors.sku && <p className="text-red-500">{errors.sku}</p>}
        </div>
        <div>
          <label className="block mb-1">Inventory Quantity:</label>
          <input
            type="text"
            name="inventoryQuantity"
            value={formData.inventoryQuantity}
            onChange={handleChange}
            className={`w-full border border-gray-300 rounded px-3 py-2 ${
              errors.inventoryQuantity ? "border-red-500" : ""
            }`}
          />
          {errors.inventoryQuantity && (
            <p className="text-red-500">{errors.inventoryQuantity}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Image Alt:</label>
          <input
            type="text"
            name="alt"
            value={formData.alt}
            onChange={handleChange}
            className={`w-full border border-gray-300 rounded px-3 py-2 ${
              errors.alt ? "border-red-500" : ""
            }`}
          />
          {errors.alt && <p className="text-red-500">{errors.alt}</p>}
        </div>
        <div>
          <label className="block mb-1">Image Src:</label>
          <input
            type="text"
            name="src"
            value={formData.src}
            onChange={handleChange}
            className={`w-full border border-gray-300 rounded px-3 py-2 ${
              errors.src ? "border-red-500" : ""
            }`}
          />
          {errors.src && <p className="text-red-500">{errors.src}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
      <div className="mt-6">
        <h2 className="text-xl mb-2">Preview Image</h2>
        {formData.src && (
          <img
            alt={formData.alt}
            src={formData.src}
            className="max-w-[200px]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/800";
            }}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
