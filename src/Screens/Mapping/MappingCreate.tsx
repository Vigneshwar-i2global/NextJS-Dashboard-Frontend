"use client";
import React, { useState, useMemo } from "react";
import { Modal, Input, Checkbox, Button, Spin, Empty } from "antd";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import { GetCategories } from "@/hooks/Category/CategoryApi";
import { GetAttribute } from "@/hooks/Attribute/AttributeApi";
import { useCreateMapping } from "@/hooks/Mapping/MappingApi";
import { AxiosError } from "axios";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MappingCreate({ open, onClose }: Props) {
  const { openNotification } = useNotification();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [searchCat, setSearchCat] = useState("");
  const [searchAttr, setSearchAttr] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: catData, isLoading: catLoading } = GetCategories();
  const { data: attrData, isLoading: attrLoading } = GetAttribute();
  const { mutateAsync: createMapping } = useCreateMapping();

  const categories = useMemo(
    () =>
      Array.isArray(catData)
        ? catData.map((c) => ({
            id: c.id || c.category_id || c._id,
            name: c.name || c.category_name,
          }))
        : [],
    [catData]
  );

  const attributes = useMemo(
    () =>
      Array.isArray(attrData)
        ? attrData.map((a) => ({
            id: a.id || a.attribute_id || a._id,
            name: a.name || a.attribute_name,
          }))
        : [],
    [attrData]
  );

  const filteredCats = useMemo(
    () => categories.filter((c) => c.name.toLowerCase().includes(searchCat.toLowerCase())),
    [categories, searchCat]
  );

  const filteredAttrs = useMemo(
    () => attributes.filter((a) => a.name.toLowerCase().includes(searchAttr.toLowerCase())),
    [attributes, searchAttr]
  );

  const catName = categories.find((c) => c.id === selectedCat)?.name || "";

  const toggleAttr = (id: string) => {
    setSelectedAttrs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const resetState = () => {
    setSelectedCat(null);
    setSelectedAttrs([]);
    setSearchCat("");
    setSearchAttr("");
  };

  const handleSubmit = async () => {
    if (!selectedCat) return openNotification("error", "Please select a category");
    if (selectedAttrs.length === 0)
      return openNotification("error", "Please select at least one attribute");

    setLoading(true);
    try {
      for (const attrId of selectedAttrs) {
        await createMapping({ category_id: selectedCat, attribute_id: attrId });
      }

      const attrNames = attributes
        .filter((a) => selectedAttrs.includes(a.id))
        .map((a) => a.name)
        .join(", ");
      openNotification("success", `Mapping created for "${catName}" with: ${attrNames}`);
      resetState();
      onClose();
    } catch (error) {
      const err = error as AxiosError<any>;
      const userMessage =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again later.";

      openNotification("error", userMessage);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = catLoading || attrLoading;

  return (
    <Modal
      open={open}
      onCancel={() => {
        resetState();
        onClose();
      }}
      footer={null}
      width={600}
      centered
      title={selectedCat ? `Select Attributes for ${catName}` : "Create Mapping"}
    >
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      ) : (
        <div className="space-y-4">
          {!selectedCat && (
            <>
              <Input
                placeholder="Search categories..."
                value={searchCat}
                onChange={(e) => setSearchCat(e.target.value)}
                allowClear
              />
              <div className="max-h-96 overflow-y-auto">
                {filteredCats.length ? (
                  <div className="space-y-2">
                    {filteredCats.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 border rounded cursor-pointer hover:border-[#9a16ca] hover:bg-purple-50"
                        onClick={() => setSelectedCat(c.id)}
                      >
                        {c.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty description="No categories found" />
                )}
              </div>
            </>
          )}

          {selectedCat && (
            <>
              <Input
                placeholder="Search attributes..."
                value={searchAttr}
                onChange={(e) => setSearchAttr(e.target.value)}
                allowClear
              />

              <div className="max-h-80 overflow-y-auto">
                {filteredAttrs.length ? (
                  <div className="space-y-2">
                    {filteredAttrs.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => toggleAttr(a.id)}
                        className={`p-3 border rounded cursor-pointer ${
                          selectedAttrs.includes(a.id)
                            ? "border-[#9a16ca] bg-purple-50"
                            : "hover:border-gray-300"
                        }`}
                      >
                        <Checkbox checked={selectedAttrs.includes(a.id)}>
                          {a.name}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty description="No attributes found" />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button onClick={() => setSelectedCat(null)}>Back</Button>
                <Button
                  type="primary"
                  loading={loading}
                  disabled={selectedAttrs.length === 0}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
