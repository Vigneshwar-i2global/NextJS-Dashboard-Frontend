"use client";
import React, { useState } from "react";
import { Card, Button, Popover } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

interface CommonCardProps {
  children: React.ReactNode;
  variant?: "default" | "bordered" | "grey" | "white";
  onEdit?: () => void;
  onDelete?: () => void;
  showMenu?: boolean;
}

const CommonCard: React.FC<CommonCardProps> = ({
  children,
  variant = "default",
  onEdit,
  onDelete,
  showMenu = true,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleEdit = () => {
    setPopoverOpen(false);  
    onEdit?.();              
  };

  const handleDelete = () => {
    setPopoverOpen(false);  
    onDelete?.();            
  };

  const menuContent = (
    <div className="flex flex-col gap-1 min-w-[50px]">
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={handleEdit}
        className="flex items-center justify-start w-full hover:bg-blue-50"
      >
        Edit
      </Button>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        className="flex items-center justify-start w-full hover:bg-red-50"
      >
        Delete
      </Button>
    </div>
  );

  const getCardStyle = () => {
    switch (variant) {
      case "bordered":
        return { background: "#fff", border: "2px solid #93C5FD" };
      case "grey":
        return { background: "#F9FAFB", border: "2px solid #D1D5DB" };
      case "white":
        return { background: "#fff", border: "1px solid #E5E7EB" };
      default:
        return { background: "#fff" };
    }
  };

  return (
    <Card
      style={getCardStyle()}
      className="rounded-lg transition-all relative hover:shadow-md"
    >
      {showMenu && (onEdit || onDelete) && (
        <div className="absolute top-3 right-3 z-10">
          <Popover
            content={menuContent}
            trigger="click"
            placement="bottomRight"
            open={popoverOpen}
            onOpenChange={setPopoverOpen}

          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined />}
              className="hover:bg-gray-200"
            />
          </Popover>
        </div>
      )}

      <div className="pr-8">{children}</div>
    </Card>
  );
};

export default CommonCard;