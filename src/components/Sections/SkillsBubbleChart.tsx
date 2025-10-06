import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, useCallback } from "react";
import * as d3 from "d3";
import {
    SiPython,
    SiTypescript,
    SiReact,
    SiJavascript,
    SiSwift,
    SiCplusplus,
    SiHtml5,
    SiCss3,
    SiXcode,
    SiGo,
    SiGnubash,
} from "react-icons/si";

import { RiTailwindCssFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { GrSwift } from "react-icons/gr";

// SkillNode interface
interface SkillNode extends d3.SimulationNodeDatum {
    id: string;
    skill: string;
    icon: any;
    color: string;
    usage: number;
    description: string;
    x?: number | undefined;
    y?: number | undefined;
}

// Define the expanded usage multiplier
const EXPANDED_MULTIPLIER = 1.8;
const BASE_RADIUS_MULTIPLIER = 1.1;
const SIMULATION_TICKS = 150;
const BASE_FORCE_STRENGTH = 0.05;

// --- RESPONSIVENESS CONSTANTS ---
// Max dimensions for desktop view
const MAX_WIDTH = 750;
const MAX_HEIGHT = 650;

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768;

// Scaling factor for base bubble size (controls overall chart density)
const getBubbleSizeScale = (isMobile: boolean): number => isMobile ? 0.5 : 0.9;

// Base size for the expanded card (responsive based on device)
const getCardDimensions = (width: number, height: number, isMobile: boolean) => ({
    cardWidth: isMobile ? Math.min(260, width * 0.75) : Math.min(220, width * 0.8),
    cardHeight: isMobile ? Math.min(180, height * 0.55) : Math.min(150, height * 0.8),
});

export const skillsConfig = [
    { id: "python", skill: "Python", icon: SiPython, color: "#3776AB", usage: 90, description: "Heavy use in backend APIs (FastAPI/Django) and data processing pipelines." },
    { id: "typescript", skill: "TypeScript", icon: SiTypescript, color: "#3178C6", usage: 80, description: "Primary language for modern frontend (React) and Node.js backend development, ensuring type safety." },
    { id: "react", skill: "React", icon: SiReact, color: "#61DAFB", usage: 85, description: "Building complex, highly interactive single-page applications (SPAs) and UI components." },
    { id: "javascript", skill: "JavaScript", icon: SiJavascript, color: "#F7DF1E", usage: 95, description: "Foundation for all web work, including legacy projects, DOM manipulation, and testing frameworks." },
    { id: "swift", skill: "Swift", icon: SiSwift, color: "#FA7343", usage: 60, description: "Developing native iOS/macOS applications and writing fast, safe code for mobile platforms." },
    { id: "cpp", skill: "C++", icon: SiCplusplus, color: "#00599C", usage: 65, description: "Used for high-performance computing, competitive programming, and low-level system integrations." },
    { id: "html", skill: "HTML5", icon: SiHtml5, color: "#E34F26", usage: 75, description: "Ensuring semantic structure and accessibility for all web projects." },
    { id: "css", skill: "CSS3",icon: SiCss3, color: "#1572B6", usage: 72, description: "Styling web interfaces with responsive design principles, Flexbox, and Grid." },
    { id: "swiftui", skill: "SwiftUI", icon: GrSwift, color: "#FF7736", usage: 55, description: "Modern declarative UI framework for building native Apple applications across all platforms." }, 
    { id: "vscode", skill: "VSCode", icon: VscVscode, color: "#007ACC", usage: 98, description: "Primary development environment for web, Python, and Go projects, heavily customized." },
    { id: "xcode", skill: "Xcode", icon: SiXcode, color: "#1575F9", usage: 62, description: "IDE for native iOS/macOS development, debugging, and mobile deployment." }, 
    { id: "go", skill: "Go", icon: SiGo, color: "#00ADD8", usage: 50, description: "Used for building performant microservices, CLI tools, and network programming." },
    { id: "shell", skill: "Shell/Bash", icon: SiGnubash, color: "#4EAA25", usage: 70, description: "Automation of deployment, build scripts, server management, and system tasks." },
    { id: "tailwind", skill: "Tailwind", icon: RiTailwindCssFill, color: "#3B82F6", usage: 70, description: "Utility-first CSS framework for rapid and consistent styling of React components." },
    { id: "tailwind", skill: "WebGL", icon: RiTailwindCssFill, color: "#3B82F6", usage: 70, description: "Utility-first CSS framework for rapid and consistent styling of React components." },
];

export default function SkillsBubbleChart() {
    // 1. DYNAMIC SIZE STATE
    const [containerSize, setContainerSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth * 0.9 : 750,
        height: typeof window !== 'undefined' ? window.innerHeight * 0.8 : 650,
        isMobile: false,
    });
    const { width, height, isMobile } = containerSize;

    // 2. RESIZE EFFECT HOOK
    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const isMobileDevice = windowWidth < MOBILE_BREAKPOINT;
            
            // Calculate fully responsive dimensions with padding for mobile
            setContainerSize({
                // Mobile: leave more space for margins
                width: isMobileDevice ? windowWidth * 0.90 : windowWidth * 0.9,
                // Mobile: increased height to use more vertical space
                height: isMobileDevice ? windowHeight * 0.70 : windowHeight * 0.8,
                isMobile: isMobileDevice,
            });
        };

        handleResize(); // Initial size calculation
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [nodes, setNodes] = useState<SkillNode[]>(
        skillsConfig.map((d) => ({ ...d, x: undefined, y: undefined }))
    );
    const [activeId, setActiveId] = useState<string | null>(null);

    const simulation = useMemo(() => {
        return d3
            .forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(isMobile ? 8 : 15))
            // 3. Dynamic Center Forces (weaker to allow more spread)
            .force("x", d3.forceX(width / 2).strength(0.03))
            .force("y", d3.forceY(height / 2).strength(0.03))
            .stop();
    }, [width, height, isMobile]); // Recreate simulation if dimensions change

    // Helper to get the calculated dimensions for a node
    const getVisualSize = useCallback(
        (node: SkillNode, isActive: boolean) => {
            // 4. Scaled Base Diameter (responsive to device type)
            const bubbleScale = getBubbleSizeScale(isMobile);
            const scaledUsage = node.usage * bubbleScale;
            const baseDiameter = scaledUsage * 2;
            
            let visualWidth = baseDiameter;
            let visualHeight = baseDiameter;

            if (isActive) {
                const { cardWidth, cardHeight } = getCardDimensions(width, height, isMobile);
                visualWidth = cardWidth;
                visualHeight = cardHeight;
            }

            return { visualWidth, visualHeight, baseRadius: scaledUsage };
        }, 
        [width, height, isMobile] // Depend on width/height/isMobile to scale appropriately
    );
    
    // Helper to get the collision radius (which pushes other bubbles away)
    const getCollisionRadius = useCallback(
        (node: SkillNode, isActive: boolean) => {
            const { visualWidth, visualHeight } = getVisualSize(node, isActive);
            
            // Collision radius is half of the *largest* visual dimension, multiplied by a buffer
            return Math.max(visualWidth, visualHeight) / 2 * BASE_RADIUS_MULTIPLIER;
        },
        [activeId, getVisualSize]
    );


    useEffect(() => {
        simulation.force(
            "collision",
            d3.forceCollide().radius((d: any) => getCollisionRadius(d as SkillNode, d.id === activeId))
        );

        // Run simulation manually for a stable, updated layout
        simulation.alpha(1); 
        simulation.alphaDecay(0.02); 

        for (let i = 0; i < SIMULATION_TICKS; i++) {
            simulation.tick();
        }
        setNodes([...simulation.nodes() as SkillNode[]]);
        
    }, [activeId, width, height, simulation, getCollisionRadius]); // Run whenever size or activeId changes

    useEffect(() => {
        // Initial layout calculation
        simulation.alpha(1);
        for (let i = 0; i < SIMULATION_TICKS; i++) {
            simulation.tick();
        }
        setNodes([...simulation.nodes() as SkillNode[]]);
    }, []);


    return (
        <div
            // Use dynamic width and height from state
            className="relative mx-auto overflow-hidden border border-gray-200 touch-none rounded-lg" 
            style={{ width, height }}
            // Close active bubble when tapping outside on mobile
            onClick={(e) => {
                if (e.target === e.currentTarget && isMobile) {
                    setActiveId(null);
                }
            }}
        >
            {nodes.map((node) => {
                if (node.x === undefined || node.y === undefined) return null;

                const Icon = node.icon;
                const isActive = activeId === node.id;
                const { visualWidth, visualHeight, baseRadius } = getVisualSize(node, isActive);
                
                return (
                    <motion.div
                        key={node.id}
                        layout
                        onHoverStart={() => !isMobile && setActiveId(node.id)}
                        // Use onTouchStart for touch devices (mobile/tablet)
                        onTouchStart={(e) => {
                            e.stopPropagation();
                            setActiveId(isActive ? null : node.id);
                        }} 
                        onHoverEnd={() => !isMobile && setActiveId(null)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveId(isActive ? null : node.id);
                        }}
                        className="absolute flex items-center justify-center cursor-pointer select-none"
                        style={{
                            // Center the element based on its new width and height
                            left: node.x - visualWidth / 2,
                            top: node.y - visualHeight / 2,
                            zIndex: isActive ? 50 : 1,
                        }}
                        transition={{
                            layout: { 
                                duration: 0.8, 
                                type: "spring",
                                damping: 15, 
                                stiffness: 100 
                            },
                        }}
                    >
                        {/* Bubble/Card Container */}
                        <motion.div
                            layout
                            style={{
                                backgroundColor: node.color,
                                width: visualWidth,
                                height: visualHeight,
                            }}
                            transition={{
                                layout: { duration: 0.5, ease: "easeInOut" },
                            }}
                            className={`flex items-center justify-center shadow-lg p-4 ${isActive ? 'rounded-xl' : 'rounded-full'}`}
                        >
                            {/* Content based on Active state */}
                            <AnimatePresence mode="wait">
                                {isActive ? (
                                    // Detailed Description Card Content
                                    <motion.div
                                        key="card-content"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-white text-center w-full h-full flex flex-col justify-center items-center overflow-hidden px-3"
                                    >
                                        <div className={`font-extrabold mb-1 ${isMobile ? 'text-sm' : 'text-lg'}`}>
                                            {node.skill}
                                        </div>
                                        <div className={`italic mb-1 ${isMobile ? 'text-[10px]' : 'text-sm'}`}>
                                            Usage: {node.usage}%
                                        </div>
                                        <p className={`leading-tight ${isMobile ? 'text-[10px]' : 'text-sm'}`}>
                                            {node.description}
                                        </p>
                                    </motion.div>
                                ) : (
                                    // Standard Icon Content
                                    <motion.div
                                        key="icon-content"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center justify-center"
                                    >
                                        <Icon
                                            size={baseRadius * 0.9} 
                                            color="white"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}