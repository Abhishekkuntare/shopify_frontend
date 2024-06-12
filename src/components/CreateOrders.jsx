import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateOrderForm = () => {
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState("");
  const [lineItems, setLineItems] = useState([
    {
      title: "",
      price: "",
      quantity: 1,
      tax_lines: [{ price: "", rate: "", title: "" }],
    },
  ]);

  const handleLineItemChange = (index, field, value) => {
    const newLineItems = [...lineItems];
    newLineItems[index][field] = value;
    setLineItems(newLineItems);
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        title: "",
        price: "",
        quantity: 1,
        tax_lines: [{ price: "", rate: "", title: "" }],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      email,
      tags,
      line_items: lineItems,
    };

    try {
      const response = await axios.post(
        "https://shopify-backend-three.vercel.app/api/orders",
        orderData,
        {
          headers: {
            "x-shopify-access-token": "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",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Order created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-2xl mb-4">Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              placeholder="Enter tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {lineItems.map((item, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-gray-700 text-lg font-bold mb-2">
                Product Item {index + 1}
              </h4>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`title-${index}`}
                >
                  Title
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  placeholder="Enter title"
                  value={item.title}
                  onChange={(e) =>
                    handleLineItemChange(index, "title", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`price-${index}`}
                >
                  Price
                </label>
                <input
                  type="number"
                  id={`price-${index}`}
                  placeholder="Enter price"
                  value={item.price}
                  onChange={(e) =>
                    handleLineItemChange(index, "price", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`quantity-${index}`}
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  placeholder="Enter quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleLineItemChange(index, "quantity", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addLineItem}
            className="bg-black mr-4 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>

          <button
            type="submit"
            className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Create Order
          </button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </section>
  );
};

export default CreateOrderForm;
