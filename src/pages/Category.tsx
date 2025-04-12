
import React from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  
  return (
    <div className="flex-grow bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Category: {id}</h1>
        <p>This page would show products for the category with ID: {id}</p>
      </div>
    </div>
  );
};

export default Category;
