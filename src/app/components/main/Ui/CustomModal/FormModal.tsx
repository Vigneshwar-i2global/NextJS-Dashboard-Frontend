"use client";
import React, { useState } from "react";
import { Modal, Input, InputNumber, Button, Select, Checkbox, DatePicker, TimePicker, Radio, Tabs } from "antd";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox" | "radio" | "date" | "time";
  placeholder?: string;
  required?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  options?: Array<{ value: any; label: string }>;
  initialValue?: any;
  disabled?: boolean;
  maxLength?: number;
};

export interface TabConfig {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values?: Record<string, any>) => void;
  title?: string;
  fields?: FormField[];
  tabs?: TabConfig[];
  loading?: boolean;
  okText?: string;
  cancelText?: string;
  initialValues?: Record<string, any>;
  errors?: Record<string, string>;
  width?: number;
  centered?: boolean;
  maxHeight?: number;
}

const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  fields,
  tabs,
  loading = false,
  okText = "Save",
  cancelText = "Cancel",
  initialValues,
  errors = {},
  width = 520,
  centered = true,
  maxHeight = 500,
}) => {
  const [formValues, setFormValues] = React.useState<Record<string, any>>(
    initialValues || {}
  );
  const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.key || "");

  React.useEffect(() => {
    if (open) {
      if (initialValues) {
        setFormValues(initialValues);
      } else {
        setFormValues({});
      }
    }
  }, [initialValues, open]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleOk = () => {
    if (tabs) {
      onSubmit();
    } else {
      onSubmit(formValues);
    }
  };

  const renderField = (field: FormField) => {
    const error = errors[field.name];
    const status = error ? "error" : undefined;
    const fieldId = `field-${field.name}`;

    switch (field.type) {
      case "textarea":
        return (
          <>
            <Input.TextArea
              id={fieldId}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="rounded-lg"
              status={status}
              disabled={field.disabled}
              maxLength={field.maxLength}
            />
            {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
          </>
        );
      case "number":
        return (
          <>
            <InputNumber
              id={fieldId}
              placeholder={field.placeholder}
              value={formValues[field.name] ?? ""}
              onChange={(value) => handleChange(field.name, value)}
              min={field.min ?? 0}
              max={field.max}
              className="w-full rounded-lg"
              status={status}
              disabled={field.disabled}
            />
            {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
          </>
        );
      case "select":
        return (
          <>
            <Select
              id={fieldId}
              showSearch
              labelInValue
              placeholder={field.placeholder || "Select an option"}
              optionFilterProp="label"
              options={field.options}
              value={formValues[field.name] || undefined}
              onChange={(value) => handleChange(field.name, value)}
              className="rounded-lg w-full"
              status={status}
              disabled={field.disabled}
            />
            {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
          </>
        );
      case "radio":
        return (
          <>
            <Radio.Group
              options={field.options}
              value={formValues[field.name] || undefined}
              onChange={(e) => handleChange(field.name, e.target.value)}
              disabled={field.disabled}
            />
            {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
          </>
        );
      case "date":
        return (
          <>
            <DatePicker
              className="w-full rounded-lg"
              value={formValues[field.name] || null}
              onChange={(value) => handleChange(field.name, value)}
              placeholder={field.placeholder || "Select date"}
              disabled={field.disabled}
              status={status}
            />
            {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
          </>
        );
      case "time":
        return (
          <>
            <TimePicker
              className="w-full rounded-lg"
              value={formValues[field.name] || null}
              onChange={(value) => handleChange(field.name, value)}
              placeholder={field.placeholder || "Select time"}
              disabled={field.disabled}
              status={status}
            />
            {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
          </>
        );
      case "checkbox":
        return (
          <Checkbox
            id={fieldId}
            checked={formValues[field.name] || false}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            disabled={field.disabled}
          >
            {field.label}
          </Checkbox>
        );
      default:
        return (
          <>
            <Input
              id={fieldId}
              placeholder={field.placeholder}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="rounded-lg"
              status={status}
              disabled={field.disabled}
              maxLength={field.maxLength}
            />
            {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
          </>
        );
    }
  };

  const renderContent = () => {
    if (tabs && tabs.length > 0) {
      return (
        <div style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabs.map(tab => ({
              key: tab.key,
              label: <span style={{ color: '#9a16ca' }}>{tab.label}</span>,
              children: tab.content,
            }))}
          />
        </div>
      );
    }

    if (fields && fields.length > 0) {
      return (
        <div className="space-y-4" style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}>
          {fields.map((field) => {
            if (field.type === "checkbox") {
              return (
                <div key={field.name}>
                  {renderField(field)}
                </div>
              );
            }

            return (
              <div key={field.name}>
                <label htmlFor={`field-${field.name}`} className="block text-gray-700 font-medium mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      centered={centered}
      width={width}
      maskClosable={!loading}
    >
      <div className="mt-4">
        {renderContent()}

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg"
          >
            {cancelText}
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            disabled={loading}
            loading={loading}
          >
            {okText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;