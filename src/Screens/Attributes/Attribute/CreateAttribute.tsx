"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Select, Space } from "antd";
import CustomModal from "@/app/components/main/Ui/CustomModal/CustomModal";
import {
  CreateAttribute,
  updateAttribute,
} from "@/hooks/Attribute/AttributeApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";

interface AttributeModalProps {
  open: boolean;
  onClose: () => void;
  attributes?: any;
}

const CreateAttributes: React.FC<AttributeModalProps> = ({
  open,
  onClose,
  attributes,
}) => {
  const [form] = Form.useForm();
  const { openNotification } = useNotification();

  const createMutation = CreateAttribute();
  const updateMutation = updateAttribute();

  useEffect(() => {
    if (attributes) {
      form.setFieldsValue({
        name: attributes.name,
        description: attributes.description,
        data_type: attributes.data_type,
        is_active: attributes.is_active,
        is_required: attributes.is_required,
      });
    } else {
      form.resetFields();
    }
  }, [attributes, form]);

  const handleSubmit = async (values: any) => {
    const dataTypeValue =
      typeof values.data_type === "object"
        ? values.data_type.label
        : values.data_type;
    const Data = {
      ...values,
      data_type: dataTypeValue,
    };
    try {
      let res;
      if (attributes) {
        res = await updateMutation.mutateAsync({
          attribute_id: attributes.attribute_id,
          payload: {
            ...values,
            data_type: dataTypeValue,
          },
        });
      } else {
        res = await createMutation.mutateAsync(Data);
      }

      openNotification(
        "success",
        res?.message ||
          (attributes ? "Attribute updated!" : "Attribute created!")
      );
      form.resetFields();
      onClose();
    } catch (err: any) {
      openNotification(
        "error",
        err?.response?.data?.message || "Operation failed."
      );
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(handleSubmit)
      .catch(() => {});
  };

  const dataType = [
    {
      value: "1",
      label: "Text",
    },
    {
      value: "2",
      label: "Integer",
    },
    {
      value: "3",
      label: "Decimal",
    },
    {
      value: "4",
      label: "Date",
    },
    {
      value: "5",
      label: "Timestamp",
    },
  ];

  return (
    <CustomModal
      title={attributes ? "Edit Attribute" : "Add New Attribute"}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={attributes ? "Update" : "Save"}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter attribute name" }]}
        >
          <Input placeholder="Enter Attribute name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={5} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Data Type"
          name="data_type"
          rules={[{ required: true, message: "Please enter data type" }]}
        >
          <Select
            showSearch
            labelInValue
            placeholder="Search to Select"
            optionFilterProp="label"
            options={dataType}
          />
        </Form.Item>
        <Space>
          <Form.Item
            name="is_active"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>Active</Checkbox>
          </Form.Item>

          <Form.Item
            name="is_required"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>Required</Checkbox>
          </Form.Item>
        </Space>
      </Form>
    </CustomModal>
  );
};

export default CreateAttributes;
