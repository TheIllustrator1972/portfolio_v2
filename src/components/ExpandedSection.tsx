import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import SkillsBubbleChart from "./Sections/SkillsBubbleChart";
import Projects from "./Sections/Projects/IndieApps";
import WebProjectsSection from "./Sections/Projects/WebProjects";
import Experience from "./Sections/Experience";

interface ExpandedSectionProps {
  activeSection: string | null;
  setActiveSection: (key: string | null) => void;
  clickPosition: { x: number; y: number };
}

export default function ExpandedSection({
  activeSection,
  setActiveSection,
  clickPosition,
}: ExpandedSectionProps) {

  return (
    <AnimatePresence>
      {activeSection && (
        <>
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
            className={`fixed inset-0 z-50 bg-white dark:bg-neutral-900 ${
              activeSection === "Skills" ? "overflow-hidden" : "overflow-auto"
            }`}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              onClick={() => setActiveSection(null)}
              className="fixed right-6 top-6 z-10 rounded-full bg-neutral-200 p-3 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              <X size={24} className="text-neutral-700 dark:text-neutral-200" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className={`container mx-auto ${
                activeSection === "Skills" 
                  ? "flex flex-col p-4 pt-12 md:p-6 md:pt-20 h-screen" 
                  : "p-8 pt-20 md:p-12 md:pt-24 min-h-screen"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className={`flex items-center gap-4 "mb-8"`}
              >
              </motion.div>
              
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className={`text-neutral-700 dark:text-neutral-300 ${
                  activeSection === "Skills" ? "w-full flex justify-center" : ""
                }`}
              >
                {activeSection === "Projects" && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <WebProjectsSection />
                    <Projects />
                    
                  </div>
                )}
                {activeSection === "Experience" && (
                  <div className="flex items-center justify-center w-full">
                    <Experience />
                  </div>
                )}
                {activeSection === "Skills" && (
                  <div className="flex items-center justify-center w-full">
                    <SkillsBubbleChart />
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}