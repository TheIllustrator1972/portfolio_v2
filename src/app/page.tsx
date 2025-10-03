"use client";

import { AnimatePresence, motion } from "framer-motion";
import FluidCursor from "@/components/FluidCursor";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
  X,
} from "lucide-react";


const questionConfig = [
  { key: "Me", color: "#329696", icon: Laugh },
  { key: "Projects", color: "#3E9858", icon: BriefcaseBusiness },
  { key: "Skills", color: "#856ED9", icon: Layers },
  { key: "Fun", color: "#B95F9D", icon: PartyPopper },
  { key: "Contact", color: "#C19433", icon: UserRoundSearch },
] as const;

export default function Home() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[8rem] leading-none font-black text-transparent select-none sm:block lg:text-[14rem]"
          style={{ marginBottom: "-2.5rem" }}
        >
          Nilesh Kamble
        </div>
      </div>

      {/* header */}
      <motion.div
        className="z-1 mt-24 mb-8 flex flex-col items-center text-center md:mt-4 md:mb-12"
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I'm Nilesh 😉
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Software Engineer
        </h1>
        <div className="relative w-36 md:w-48 aspect-square">
          <motion.div
            layout
            initial={{ borderRadius: "50%" }}
            whileHover={{ scale: 1.1 }}
            className="relative w-full h-full overflow-hidden"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <Image
              src="/profilePic.jpg"
              fill
              alt="Profile Pic"
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              window.location.href = `mailto:nileshkamble54321@gmail.com?subject=Hello&body=${encodeURIComponent(
                input.trim()
              )}`;
              setInput("");
            }
          }}
          className="relative w-full max-w-lg"
        >
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Email"
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit Query"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <motion.button
              key={key}
              layoutId={`card-${key}`}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setClickPosition({
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                });
                setActiveSection(key);
              }}
              className="aspect-square w-full cursor-pointer rounded-2xl border-2 border-neutral-300 bg-white/50 py-8 shadow-none backdrop-blur-lg transition-all hover:border-neutral-400 hover:bg-white/70 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-neutral-600 dark:hover:bg-neutral-800/70 md:p-10"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1">
                <Icon size={22} strokeWidth={2} color={color} />
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 sm:text-sm">
                  {key}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {activeSection && (
            <>
              {/* Circular expanding overlay */}
              <motion.div
                initial={{
                  clipPath: `circle(0% at ${clickPosition.x}px ${clickPosition.y}px)`,
                }}
                animate={{
                  clipPath: `circle(150% at ${clickPosition.x}px ${clickPosition.y}px)`,
                }}
                exit={{
                  clipPath: `circle(0% at ${clickPosition.x}px ${clickPosition.y}px)`,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="fixed inset-0 z-50 overflow-auto bg-white dark:bg-neutral-900"
              >
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  onClick={() => setActiveSection(null)}
                  className="fixed right-6 top-6 z-10 rounded-full bg-neutral-200 p-3 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                  <X
                    size={24}
                    className="text-neutral-700 dark:text-neutral-200"
                  />
                </motion.button>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="container mx-auto min-h-screen p-8 pt-20 md:p-12 md:pt-24"
                >
                  {/* Header with icon */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="mb-8 flex items-center gap-4"
                  >
                    {(() => {
                      const section = questionConfig.find(
                        (s) => s.key === activeSection
                      );
                      const Icon = section?.icon;
                      return (
                        <>
                          {Icon && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                delay: 0.5,
                                duration: 0.5,
                                type: "spring",
                              }}
                            >
                              <Icon
                                size={48}
                                strokeWidth={2}
                                color={section.color}
                              />
                            </motion.div>
                          )}
                          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 md:text-5xl lg:text-6xl">
                            {activeSection}
                          </h1>
                        </>
                      );
                    })()}
                  </motion.div>

                  {/* Content area - replace with your actual content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="text-neutral-700 dark:text-neutral-300"
                  >
                    {activeSection === "Me" && (
                      <div className="space-y-6">
                        <p className="text-xl">Your Me content here...</p>
                      </div>
                    )}
                    {activeSection === "Projects" && (
                      <div className="space-y-6">
                        <p className="text-xl">Your Projects content here...</p>
                      </div>
                    )}
                    {activeSection === "Skills" && (
                      <div className="space-y-6">
                        <p className="text-xl">Your Skills content here...</p>
                      </div>
                    )}
                    {activeSection === "Fun" && (
                      <div className="space-y-6">
                        <p className="text-xl">Your Fun content here...</p>
                      </div>
                    )}
                    {activeSection === "Contact" && (
                      <div className="space-y-6">
                        <p className="text-xl">Your Contact content here...</p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <FluidCursor />
    </div>
  );
}
