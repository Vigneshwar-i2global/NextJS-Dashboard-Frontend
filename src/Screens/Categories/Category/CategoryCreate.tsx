"use client";
import React from "react";
import { CreateCategory, UpdateCategory } from "@/hooks/Category/CategoryApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import FormModal, { FormField } from "@/app/components/main/Ui/CustomModal/FormModal";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  category?: any;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, onClose, category }) => {
  const { openNotification } = useNotification();
  const [loading, setLoading] = React.useState(false);

  const createMutation = CreateCategory();
  const updateMutation = UpdateCategory();

  const fields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter category name",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      rows: 5,
      required: true,
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      placeholder: "Enter display order",
      required: true,
      min: 1,
    },
  ];

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      let res;
      if (category) {
        res = await updateMutation.mutateAsync({
          ...values,
          category_id: category.category_id,
        });
      } else {
        res = await createMutation.mutateAsync(values);
      }

      openNotification(
        "success",
        res?.message || (category ? "Category updated!" : "Category created!")
      );
      onClose();
    } catch (err: any) {
      openNotification("error", err?.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={category ? "Edit Category" : "Add New Category"}
      fields={fields}
      loading={loading}
      okText={category ? "Update" : "Save"}
      initialValues={
        category ? {
          name: category.name,
          description: category.description,
          displayOrder: category.display_order,
        } : undefined
      }
    />
  );
};

export default CategoryModal;