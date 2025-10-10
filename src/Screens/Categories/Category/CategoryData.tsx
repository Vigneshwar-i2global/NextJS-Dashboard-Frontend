"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import CategoryModal from "./CategoryCreate";
import WarningModal from "@/app/components/main/Ui/WarningModal/WarningModal";
import { GetCategories, DeleteCategory } from "@/hooks/Category/CategoryApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";

const CategoryData = () => {
  const { data, isLoading, isError, error } = GetCategories();
  const { openNotification } = useNotification();
  const deleteMutation = DeleteCategory();

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedCategory) return;

    deleteMutation.mutate(selectedCategory.category_id, {
      onSuccess: () => {
        openNotification("success", "Category deleted successfully!");
        setIsDeleteOpen(false);
        setSelectedCategory(null);
      },
      onError: (err: any) => {
        openNotification(
          "error",
          err?.response?.data?.message || "Failed to delete category."
        );
      },
    });
  };

  if (isLoading) return <CustomLoader text="Loading categories..." />;

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load categories: {error?.message || "Unknown error"}
      </div>
    );

  if (!data || data.length === 0)
    return <CustomEmpty message="No categories available" />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((category: any) => (
          <CommonCard
            key={category.category_id}
            variant="white"
            onEdit={() => handleEdit(category)}
            onDelete={() => handleDelete(category)}
          >
            <div className="mb-4 flex justify-between items-start">
              <span className="px-3 py-1.5 bg-gray-100 text-[#000] rounded-lg text-xs font-semibold shadow-sm">
                Order: {category.display_order}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {dayjs(category.created_at).format("DD MMM YYYY")}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {category.name}
            </h3>

            <p className="text-gray-600 text-sm mb-6 line-clamp-3 min-h-[60px]">
              {category.description || "No description provided."}
            </p>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <CustomButton
                label="View Details"
                icon={<EyeOutlined />}
                onClick={() =>
                  console.log("View details:", category.category_id)
                }
              />
            </div>
          </CommonCard>
        ))}
      </div>

      <CategoryModal
        open={isModalOpen}
        category={selectedCategory}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
      />

      <WarningModal
        open={isDeleteOpen}
        message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  );
};

export default CategoryData;
