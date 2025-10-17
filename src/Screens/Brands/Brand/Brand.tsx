"use client";
import React, { useState } from "react";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import BrandData from "./BrandData";
import CreateBrand from "./CreateBrand";
import { Plus } from "lucide-react";
export default function Brand() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <div className="flex justify-end">
          <CustomButton
            label="Add Unit"
            icon={<Plus />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <CreateBrand open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="mt-3">
          <BrandData />
        </div>
      </div>
    </>
  );
}
