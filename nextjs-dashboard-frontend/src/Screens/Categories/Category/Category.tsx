"use client";

import React, { useState } from "react";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CategoryCreate from "./CategoryCreate";
import Cards from "@/app/components/main/Cards/Cards";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values: any) => {
    console.log("Category Form Submitted:", values);
  };

  return (
    <div>
      <div className="flex justify-end">
      <CustomButton label="Add Category" onClick={() => setIsModalOpen(true)} />
      </div>
      <CategoryCreate
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    <Cards/>
    </div>
  );
};

export default Category;
