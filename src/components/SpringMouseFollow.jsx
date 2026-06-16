"use client";

import { motion, useSpring } from "framer-motion";
import Eye from "./Eye";
import React, { useEffect, useState, useRef } from "react";

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

  const [emotion, setEmotion] = useState("normal");
  const [isTorch, setIsTorch] = useState(false);
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    let isMouseOver = true;

    const handleMouseMove = (e) => {
      if (!isMouseOver) return;
      xSpring.set(e.clientX + OFFSET_X);
      ySpring.set(e.clientY + OFFSET_Y);
    };

    const handleMouseEnter = () => {
      isMouseOver = true;
      setIsOut(false);
      opacitySpring.set(1);
      scaleSpring.set(1);
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      setIsOut(true);
      // Keep opacity at 1, but let it glow
    };

    const handleEyeHover = (e) => {
      setEmotion(e.detail.emotion);
    };

    const handleEyeLeave = () => {
      setEmotion("normal");
    };

    const handleEyeTorch = () => setIsTorch(true);
    const handleEyeUntorch = () => setIsTorch(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("eye-hover", handleEyeHover);
    window.addEventListener("eye-leave", handleEyeLeave);
    window.addEventListener("eye-torch", handleEyeTorch);
    window.addEventListener("eye-untorch", handleEyeUntorch);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("eye-hover", handleEyeHover);
      window.removeEventListener("eye-leave", handleEyeLeave);
      window.removeEventListener("eye-torch", handleEyeTorch);
      window.removeEventListener("eye-untorch", handleEyeUntorch);
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
      className="hidden md:block lg:block fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
    >
      <Eye side="left" emotion={emotion} isTorch={isTorch} isOut={isOut} />
    </motion.div>
  );
};

export { SpringMouseFollow };
