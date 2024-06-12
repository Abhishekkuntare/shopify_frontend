import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Products } from "./components/Products";
import { CreateProduct } from "./components/CreateProduct";
import { Navbar } from "./components/Navbar";
import Orders from "./components/Orders";
import CreateOrderForm from "./components/CreateOrders";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/createorder" element={<CreateOrderForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
