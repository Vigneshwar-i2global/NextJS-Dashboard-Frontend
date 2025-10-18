"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { message } from "antd";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import WarningModal from "@/app/components/main/Ui/WarningModal/WarningModal";
import { GetMapping, useDeleteMapping } from "@/hooks/Mapping/MappingApi";

export default function MappingData() {
  const { data, isLoading, isError, error } = GetMapping();
  const deleteMutation = useDeleteMapping();

  const [selectedMapping, setSelectedMapping] = useState<any>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = (mapping: any) => {
    setSelectedMapping(mapping);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMapping) return;
    deleteMutation.mutate(
      {
        category_id: selectedMapping.category_id,
        attribute_id: selectedMapping.attribute_id,
      },
      {
        onSuccess: () => {
          message.success("Mapping deleted successfully");
          setIsDeleteOpen(false);
        },
        onError: () => {
          message.error("Failed to delete mapping");
        },
      }
    );
  };

  if (isLoading) return <CustomLoader text="Loading Mappings..." />;

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load Mappings: {error?.message || "Unknown error"}
      </div>
    );

  if (!data || data.length === 0)
    return <CustomEmpty message="No Mappings available" />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((mapping: any) => (
          <CommonCard
            key={`${mapping.category_id}-${mapping.attribute_id}`}
            variant="white"
            onDelete={() => handleDelete(mapping)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Category ID
                </p>
                <p className="text-sm text-gray-600 break-words whitespace-nowwrap">
                  {mapping.category_id}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Attribute ID
                </p>
                <p className="text-sm text-gray-600 break-words whitespace-nowwrap">
                  {mapping.attribute_id}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                Created Date
              </p>
              <p className="text-sm text-gray-600">
                {dayjs(mapping.created_at).format("DD MMM YYYY, hh:mm A")}
              </p>
            </div>
          </CommonCard>
        ))}
      </div>

      <WarningModal
        open={isDeleteOpen}
        message={`Are you sure you want to delete mapping "${selectedMapping?.category_id} - ${selectedMapping?.attribute_id}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
