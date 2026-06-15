"use client";

import { motion, useSpring } from "framer-motion";
import Eye from "./Eye";
import React, { useEffect } from "react";

const SPRING = {
  mass: 0.5,
  damping: 20,
  stiffness: 100,
};

// Offset values - adjust these to change how far the eye is from the cursor
const OFFSET_X = 40; // pixels to the right
const OFFSET_Y = 40; // pixels down

const SpringMouseFollow = () => {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(1, SPRING);
  const scaleSpring = useSpring(1, SPRING);

  useEffect(() => {
    let isMouseOver = true;

    const handleMouseMove = (e) => {
      if (!isMouseOver) return;
      // Add offset to the cursor position
      xSpring.set(e.clientX + OFFSET_X);
      ySpring.set(e.clientY + OFFSET_Y);
    };

    const handleMouseEnter = () => {
      isMouseOver = true;
      opacitySpring.set(1);
      scaleSpring.set(1);
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      opacitySpring.set(0);
      scaleSpring.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [xSpring, ySpring, opacitySpring, scaleSpring]);

  return (
    <motion.div
      style={{
        x: xSpring,
        y: ySpring,
        opacity: opacitySpring,
        scale: scaleSpring,
      }}
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
    >
      <Eye emotion="normal" />
    </motion.div>
  );
};

export { SpringMouseFollow };
