"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

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

  const handlePointerMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();

    xSpring.set(e.clientX - bounds.left);
    ySpring.set(e.clientY - bounds.top);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }}
      onPointerLeave={() => {
        opacitySpring.set(0);
        scaleSpring.set(0);
      }}
      className="w-screen h-full bg-background mt-20 size-[500px] overflow-hidden"
    >
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          opacity: opacitySpring,
          scale: scaleSpring,
        }}
        className="rounded-4xl size-10 bg-orange-500"
      />
    </div>
  );
};


export { SpringMouseFollow} ;