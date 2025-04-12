
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  
  // This component would fetch and display product details
  return (
    <div className="flex-grow bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Product Detail: {id}</h1>
        <p>This page would show the details for the product with ID: {id}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
