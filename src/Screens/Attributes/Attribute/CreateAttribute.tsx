"use client";
import React, { useState } from "react";
import {
  CreateAttribute,
  UpdateAttribute,
} from "@/hooks/Attribute/AttributeApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import FormModal, { FormField } from "@/app/components/main/Ui/CustomModal/FormModal";

interface AttributeModalProps {
  open: boolean;
  onClose: () => void;
  attributes?: any;
}

const AttributeModal: React.FC<AttributeModalProps> = ({
  open,
  onClose,
  attributes,
}) => {
  const { openNotification } = useNotification();
  const [loading, setLoading] = React.useState(false);

  const createMutation = CreateAttribute();
  const updateMutation = UpdateAttribute();

  const dataTypeOptions = [
    { value: "1", label: "Text" },
    { value: "2", label: "Integer" },
    { value: "3", label: "Decimal" },
    { value: "4", label: "Date" },
    { value: "5", label: "Timestamp" },
  ];

  const fields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Attribute name",
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
      name: "data_type",
      label: "Data Type",
      type: "select",
      placeholder: "Search to Select",
      required: true,
      options: dataTypeOptions,
    },
    {
      name: "is_active",
      label: "Active",
      type: "checkbox",
      initialValue: false,
    },
    {
      name: "is_required",
      label: "Required",
      type: "checkbox",
      initialValue: false,
    },
  ];

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const dataTypeValue =
        typeof values.data_type === "object"
          ? values.data_type.value
          : values.data_type;

      const payload = {
        ...values,
        data_type: dataTypeValue,
      };

      let res;
      if (attributes) {
        res = await updateMutation.mutateAsync({
          attribute_id: attributes.attribute_id,
          payload,
        });
      } else {
        res = await createMutation.mutateAsync(payload);
      }

      openNotification(
        "success",
        res?.message ||
          (attributes ? "Attribute updated!" : "Attribute created!")
      );
      onClose();
    } catch (err: any) {
      openNotification(
        "error",
        err?.response?.data?.message || "Operation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const initialValues = attributes
    ? {
        name: attributes.name,
        description: attributes.description,
        data_type: { value: attributes.data_type, label: attributes.data_type },
        is_active: attributes.is_active,
        is_required: attributes.is_required,
      }
    : undefined;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={attributes ? "Edit Attribute" : "Add New Attribute"}
      fields={fields}
      loading={loading}
      okText={attributes ? "Update" : "Save"}
      initialValues={initialValues}
    />
  );
};

export default AttributeModal;