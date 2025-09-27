"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Coffee, BedDouble } from "lucide-react"; // import more icons

const GreetingContent = ({ userName = "Vincent" }) => {
  const [greeting, setGreeting] = useState("");
  const [Icon, setIcon] = useState(() => Sun); // default icon

  const updateGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good Morning");
      setIcon(() => Sun);
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
      setIcon(() => Coffee);
    } else if (hour < 21) {
      setGreeting("Good Evening");
      setIcon(() => Moon);
    } else {
      setGreeting("Still up? Let's be productive!");
      setIcon(() => BedDouble);
    }
  };

  useEffect(() => {
    updateGreeting();
    const timer = setInterval(updateGreeting, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="welocme-container flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Icon className="text-yellow-500 w-7 h-7" />
      <span>
        {greeting}, {userName}!
      </span>
    </motion.div>
  );
};

export default GreetingContent;
