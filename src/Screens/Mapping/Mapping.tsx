"use client";

import React, { useState } from "react";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import { Plus } from "lucide-react";
import MappingCreate from "./MappingCreate";
import MappingData from "./MappingData";

const Mapping = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end">
        <CustomButton
          label="Add Mapping"
          icon={<Plus />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <MappingCreate open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="mt-3">
        <MappingData/>
      </div>
    </div>
  );
};

export default Mapping;
