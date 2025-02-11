'use client';

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react"; // ✅ Correct import

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  //track active animations
  const animationRef = useRef({ x: null, y: null });

  const rotate = useTransform(x, (latestX) => latestX / 5);

  const handleDragStart = () => {
    setDragging(true);
    if (animationRef.current.x) animationRef.current.x.stop();
    if (animationRef.current.y) animationRef.current.y.stop();
  };

  const handleRelease = () => {
    setDragging(false);

    //return ball to center
    animationRef.current.x = animate(x, 0, {
      easing: "ease-out",
      duration: 1,
    });

    animationRef.current.y = animate(y, 0, {
      easing: "ease-out",
      duration: 1,
    });

    setTimeout(() => setToggle(false), 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-white">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold text-black">thumb*ball</h1>

        <motion.div
          className={`w-24 h-24 rounded-full shadow-lg cursor-pointer flex items-center justify-center text-xl font-bold bg-red-500 transition-opacity duration-1000 ${
            toggle || dragging ? "opacity-100" : "opacity-70"
          }`}
          style={{ x, y, rotate }}
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          onDragStart={handleDragStart}
          onDragEnd={handleRelease}
          whileTap={{ scale: 0.85 }}
          onClick={() => setToggle(!toggle)}
          onMouseDown={() => setToggle(true)}
          onTouchStart={() => setToggle(true)}
        >
          {toggle ? "*.*" : "-.-"}
        </motion.div>
      </div>
    </div>
  );
}
