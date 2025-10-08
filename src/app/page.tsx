"use client";

import {  motion } from "framer-motion";
import FluidCursor from "@/components/FluidCursor";
import {  useState } from "react";
import {
  BriefcaseBusiness,
  Layers,
  TableOfContents
} from "lucide-react";
import ExpandedSection from "@/components/ExpandedSection";
import IntroHeader from "@/components/IntroHeader";
import EmailInput from "@/components/EmailInput";
import SocialsComponent from "@/components/SocialsComponent";
import { socialConfig } from "./constants";


const sectionConfig = [
  { key: "Projects", color: "#3E9858", icon: BriefcaseBusiness },
  { key: "Experience", color: "#C19433", icon: TableOfContents },
  { key: "Skills", color: "#856ED9", icon: Layers },
];

export default function Home() {
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
      <IntroHeader />
      <SocialsComponent config={socialConfig}/>
      <motion.div
        initial="hidden"
        animate="visible"
        className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
      >
        <EmailInput />

        <div className="mt-4 grid w-full max-w-2xl grid-cols-3 gap-2">
          {sectionConfig.map(({ key, color, icon: Icon }) => (
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
              className=" w-full cursor-pointer rounded-2xl border-2 border-neutral-300 bg-white/50 py-8 shadow-none backdrop-blur-lg transition-all hover:border-neutral-400 hover:bg-white/70 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-neutral-600 dark:hover:bg-neutral-800/70 md:p-10"
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
        <ExpandedSection
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            clickPosition={clickPosition}
        />
      </motion.div>

      <FluidCursor />
    </div>
  );
}
