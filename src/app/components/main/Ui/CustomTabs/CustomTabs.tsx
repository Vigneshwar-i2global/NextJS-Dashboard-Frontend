"use client";

import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { AnimatePresence, motion } from "framer-motion";

interface CustomTabsProps {
  tabs?: TabsProps["items"];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs = [],
  defaultActiveKey,
  onChange,
}) => {
  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey || String(tabs[0]?.key || "1")
  );

  if (!tabs || tabs.length === 0) {
    return <div>No tabs available</div>;
  }

  // current active tab content
  const activeTab = tabs.find((tab) => tab?.key === activeKey);

  return (
    <div>
      {/* Ant Design Tab headers */}
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          onChange?.(key);
        }}
        items={tabs.map(({ key, label }) => ({ key, label }))}
        className="custom-tabs"
      />

      {/* Animated Tab Content */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab?.children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomTabs;
