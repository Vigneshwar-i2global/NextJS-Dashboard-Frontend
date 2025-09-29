// components/Ui/CategoryModal/CategoryModal.tsx
"use client";

import React from "react";
import { Form, Input, InputNumber } from "antd";
import CustomModal from "@/app/components/main/Ui/CustomModal/CustomModal";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const CategoryCreate: React.FC<CategoryModalProps> = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <CustomModal
      title="Add New Category"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
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
          <Input.TextArea rows={3} placeholder="Enter description" />
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

export default CategoryCreate;
