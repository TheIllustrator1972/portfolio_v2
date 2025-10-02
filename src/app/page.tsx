"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FluidCursor from "@/components/FluidCursor";

export default function Home() {
  const [show, setShow] = useState(false);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl sm:text-6xl font-bold text-center">
        Nilesh Kamble
      </h1>
      
      {!show && (
        <button
          onClick={() => setShow(true)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px 40px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Tap to Animate
        </button>
      )}
      <AnimatePresence>
        {show && (
          <motion.div
            key="full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={() => setShow(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              backgroundColor: "#0070f3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "40px",
              cursor: "pointer",
            }}
          >
            Tap to Close
          </motion.div>
        )}
      </AnimatePresence>
      <FluidCursor />
    </div>
  );
}
