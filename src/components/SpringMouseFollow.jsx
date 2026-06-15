"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";
import Eye from "./Eye";

const SPRING = {
  mass: 0.1,
  damping: 10,
  stiffness: 131,
};

const SpringMouseFollow = () => {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  return (
    <div
        onPointerMove={(e) => {
            const bounds = e.currentTarget.getBoundingClientRect();

            xSpring.set(e.clientX - bounds.left);
            ySpring.set(e.clientY - bounds.top);
        }}
        onPointerEnter={() => {
            opacitySpring.set(1);
            scaleSpring.set(1);
        }}
        onPointerLeave={() => {
            opacitySpring.set(0);
            scaleSpring.set(0);
        }}
        className="absolute inset-0 rounded-4xl bg-background mt-20 w-screen h-screen overflow-hidden cursor-none"
    >
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          opacity: opacitySpring,
          scale: scaleSpring,
        }}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
        >
            <Eye/>
        </motion.div>
    </div>
  );
};


export {SpringMouseFollow };