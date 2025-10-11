"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import CreateAttributes from "./CreateAttribute";
import WarningModal from "@/app/components/main/Ui/WarningModal/WarningModal";
import { deleteAttribute } from "@/hooks/Attribute/AttributeApi";
import { GetAttribute } from "@/hooks/Attribute/AttributeApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import { Tag } from "antd";
import {
  CheckCircleOutlined
} from '@ant-design/icons';

export default function AttributeData() {
  const { data, isLoading, isError, error } = GetAttribute();
  const { openNotification } = useNotification();
  const deleteMutation = deleteAttribute();

  const [selectedAttribute, setSelectedAttribute] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (attribute: any) => {
    setSelectedAttribute(attribute);
    setIsModalOpen(true);
  };

  const handleDelete = (attribute: any) => {
    setSelectedAttribute(attribute);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedAttribute) return;

    deleteMutation.mutate(selectedAttribute.attribute_id, {
      onSuccess: () => {
        openNotification("success", "Attribute deleted successfully!");
        setIsDeleteOpen(false);
        setSelectedAttribute(null);
      },
      onError: (err: any) => {
        openNotification(
          "error",
          err?.response?.data?.message || "Failed to delete attribute."
        );
      },
    });
  };

  if (isLoading) return <CustomLoader text="Loading Attributes..." />;

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load Attributes: {error?.message || "Unknown error"}
      </div>
    );

  if (!data || data.length === 0)
    return <CustomEmpty message="No Attributes available" />;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((attribute: any) => (
          <CommonCard
            key={attribute.attribute_id}
            variant="white"
            onEdit={() => handleEdit(attribute)}
            onDelete={() => handleDelete(attribute)}
          >
            <div className="mb-4">
            <Tag icon={<CheckCircleOutlined />} color="success">
              Active
            </Tag>
            </div>
            <div className="mb-4 flex justify-between items-start">
              <span className="px-3 py-1.5 bg-gray-100 text-[#000] rounded-lg text-xs font-semibold shadow-sm">
                Type :{" "}
                {attribute.data_type.charAt(0).toUpperCase() +
                  attribute.data_type.slice(1).toLowerCase()}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {dayjs(attribute.created_at).format("DD MMM YYYY")}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {attribute.name}
            </h3>

            <p className="text-gray-600 text-sm mb-6 line-clamp-3 min-h-[60px]">
              {attribute.description || "No description provided."}
            </p>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <CustomButton label="View Details" icon={<EyeOutlined />} />
            </div>
          </CommonCard>
        ))}
      </div>

      <CreateAttributes
        open={isModalOpen}
        attributes={selectedAttribute}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAttribute(null);
        }}
      />

      <WarningModal
        open={isDeleteOpen}
        message={`Are you sure you want to delete "${selectedAttribute?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
