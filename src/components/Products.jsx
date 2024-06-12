import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductCard } from "./ProductCard";

export const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    vendor: "",
    price: "",
    alt: "",
    src: "",
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const limit = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilterAndPagination();
  }, [currentPage, allProducts, searchTerm, priceRange]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://shopify-backend-three.vercel.app/api/products",
        {
          headers: {
            "x-shopify-access-token": "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",
          },
        }
      );
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.", {
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
    setLoading(false);
  };

  const handleFilterAndPagination = () => {
    const filteredProducts = allProducts.filter((product) => {
      const matchesTitle = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const productPrice = parseFloat(product.variants[0]?.price || 0);
      const matchesPrice =
        (!priceRange.min || productPrice >= parseFloat(priceRange.min)) &&
        (!priceRange.max || productPrice <= parseFloat(priceRange.max));
      return matchesTitle && matchesPrice;
    });

    const indexOfLastProduct = currentPage * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    setProducts(
      filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    );

    if (searchTerm) {
      setSuggestions(
        allProducts
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5)
      );
    } else {
      setSuggestions([]);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(allProducts.length / limit)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setSuggestions([]);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      vendor: product.vendor,
      price: product.variants[0]?.price || "",
      alt: product.images[0]?.alt || "",
      src: product.images[0]?.src || "",
    });
  };

  const handleDeleteClick = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `https://shopify-backend-three.vercel.app/api/products/${productId}`,
          {
            headers: {
              "x-shopify-access-token":
                "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",
            },
          }
        );
        fetchProducts();
        toast.success("Product Deleted!", {
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
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.", {
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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const productId = editingProduct.id;
    const imagesArray = [{ alt: formData.alt, src: formData.src }];
    const variantsArray = [{ price: formData.price }];

    const formDataToSend = {
      title: formData.title,
      vendor: formData.vendor,
      images: imagesArray,
      variants: variantsArray,
    };

    try {
      await axios.put(
        `https://shopify-backend-three.vercel.app/api/products/${productId}`,
        formDataToSend,
        {
          headers: {
            "x-shopify-access-token": "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",
          },
        }
      );
      setEditingProduct(null);
      fetchProducts();
      toast.success("Product updated!", {
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
      console.error("Error updating product:", error);
      toast.error("Failed to update product.", {
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

  const totalPages = Math.ceil(allProducts.length / limit);

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex justify-center items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search...."
              className="border border-gray-300 w-full md:w-80 rounded-md p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion.title)}
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mb-6 space-x-4">
          <input
            type="number"
            placeholder="Min Price"
            className="border border-gray-300 w-32 rounded-md p-2"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border border-gray-300 w-32 rounded-md p-2"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="black"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handlePrevPage}
                className={`mr-2 p-2 rounded-md ${
                  currentPage === 1 ? "bg-gray-300" : "bg-black text-white"
                }`}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="p-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                className={`ml-2 p-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-black text-white"
                }`}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-96">
            <h2 className="text-2xl mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Vendor:</label>
                <input
                  type="text"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Price:</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Image Alt:</label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Image Src:</label>
                <input
                  type="text"
                  name="src"
                  value={formData.src}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="mr-2 bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    </section>
  );
};
