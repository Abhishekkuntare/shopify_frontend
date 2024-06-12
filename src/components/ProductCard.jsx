import React from "react";

import { Star } from "lucide-react";

import "react-toastify/dist/ReactToastify.css";

export const ProductCard = ({ product, onEditClick, onDeleteClick }) => (
  <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
    <div className="relative w-full overflow-hidden aspect-w-1 aspect-h-1">
      {product.images && product.images.length > 0 ? (
        <img
          alt={product.title}
          className="w-full h-full object-cover"
          src={product.images[0].src}
        />
      ) : (
        <img
          alt="placeholder"
          className="w-full h-full object-cover"
          src="https://via.placeholder.com/800"
        />
      )}
    </div>
    <div className="flex flex-col p-4">
      <h2 className="text-sm font-semibold tracking-widest text-gray-500">
        {product.vendor}
      </h2>
      <h1 className="my-2 text-xl font-semibold text-black">{product.title}</h1>
      <div className="my-2 flex items-center">
        <span className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-500" />
          ))}
          <span className="ml-3 inline-block text-xs font-semibold">
            {product.reviews} Reviews
          </span>
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="title-font text-lg font-bold text-gray-900">
          ₹
          {product.variants && product.variants[0]
            ? product.variants[0].price
            : "N/A"}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          onClick={() => onEditClick(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          onClick={() => onDeleteClick(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
