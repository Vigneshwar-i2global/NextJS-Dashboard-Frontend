"use client";
import React, { useEffect } from "react";
import { Form, Input, InputNumber } from "antd";
import CustomModal from "@/app/components/main/Ui/CustomModal/CustomModal";
import { CreateCategory, UpdateCategory } from "@/hooks/Category/CategoryApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  category?: any; 
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, onClose, category }) => {
  const [form] = Form.useForm();
  const { openNotification } = useNotification();

  const createMutation = CreateCategory();
  const updateMutation = UpdateCategory();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
        displayOrder: category.display_order,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleSubmit = async (values: any) => {
    try {
      let res;
      if (category) {
        res = await updateMutation.mutateAsync({ ...values, category_id: category.category_id });
      } else {
        res = await createMutation.mutateAsync(values);
      }

      openNotification(
        "success",
        res?.message || (category ? "Category updated!" : "Category created!")
      );
      form.resetFields();
      onClose();
    } catch (err: any) {      
      openNotification("error", err?.response?.data?.message || "Operation failed.");
    }
  };

  const handleOk = () => {
    form.validateFields().then(handleSubmit).catch(() => {});
  };

  return (
    <CustomModal
      title={category ? "Edit Category" : "Add New Category"}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={category ? "Update" : "Save"}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={5} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Display Order"
          name="displayOrder"
          rules={[{ required: true, message: "Please enter display order" }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default CategoryModal;
