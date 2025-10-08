import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, useCallback } from "react";
import * as d3 from "d3";
import { skillsConfig } from "@/app/constants";
import { IconType } from "react-icons";

interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  skill: string;
  icon: IconType;
  usage: number;
  description: string;
  x?: number | undefined;
  y?: number | undefined;
}

const BASE_RADIUS_MULTIPLIER = 1.1;
const SIMULATION_TICKS = 150;

const BASE_BORDER_COLOR = "#4f46e5";

const MOBILE_BREAKPOINT = 768;

const getBubbleSizeScale = (isMobile: boolean): number =>
  isMobile ? 0.5 : 0.9;

const getCardDimensions = (
  width: number,
  height: number,
  isMobile: boolean
) => ({
  cardWidth: isMobile
    ? Math.min(260, width * 0.75)
    : Math.min(220, width * 0.8),
  cardHeight: isMobile
    ? Math.min(180, height * 0.55)
    : Math.min(150, height * 0.8),
});



export default function SkillsBubbleChart() {
  const [containerSize, setContainerSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth * 0.9 : 750,
    height: typeof window !== "undefined" ? window.innerHeight * 0.8 : 650,
    isMobile: false,
  });
  const { width, height, isMobile } = containerSize;

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const isMobileDevice = windowWidth < MOBILE_BREAKPOINT;

      setContainerSize({
        width: isMobileDevice ? windowWidth * 0.9 : windowWidth * 0.9,
        height: isMobileDevice ? windowHeight * 0.7 : windowHeight * 0.8,
        isMobile: isMobileDevice,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [nodes, setNodes] = useState<SkillNode[]>(
    skillsConfig.map((d) => ({ ...d, x: undefined, y: undefined }))
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const simulation = useMemo(() => {
    return (
      d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(isMobile ? 8 : 15))
        .force("x", d3.forceX(width / 2).strength(0.03))
        .force("y", d3.forceY(height / 2).strength(0.03))
        .stop()
    );
  }, [width, height, isMobile]);

  const getVisualSize = useCallback(
    (node: SkillNode, isActive: boolean) => {
      const bubbleScale = getBubbleSizeScale(isMobile);
      const scaledUsage = node.usage * bubbleScale;
      const baseDiameter = scaledUsage * 2;

      let visualWidth = baseDiameter;
      let visualHeight = baseDiameter;

      if (isActive) {
        const { cardWidth, cardHeight } = getCardDimensions(
          width,
          height,
          isMobile
        );
        visualWidth = cardWidth;
        visualHeight = cardHeight;
      }

      return { visualWidth, visualHeight, baseRadius: scaledUsage };
    },
    [width, height, isMobile]
  );

  const getCollisionRadius = useCallback(
    (node: SkillNode, isActive: boolean) => {
      const { visualWidth, visualHeight } = getVisualSize(node, isActive);
      return (Math.max(visualWidth, visualHeight) / 2) * BASE_RADIUS_MULTIPLIER;
    },
    [ getVisualSize]
  );

  useEffect(() => {
    simulation.force(
      "collision",
      d3
        .forceCollide()
        .radius((d: any) =>
          {
            const node = d as SkillNode;
            return getCollisionRadius(node as SkillNode, node.id === activeId)}
        )
    );

    simulation.alpha(1);
    simulation.alphaDecay(0.02);

    for (let i = 0; i < SIMULATION_TICKS; i++) {
      simulation.tick();
    }
    setNodes([...(simulation.nodes() as SkillNode[])]);
  }, [activeId, width, height, simulation, getCollisionRadius]);

  useEffect(() => {
    simulation.alpha(1);
    for (let i = 0; i < SIMULATION_TICKS; i++) {
      simulation.tick();
    }
    setNodes([...(simulation.nodes() as SkillNode[])]);
  }, []);

  return (
    <div
      className="relative mx-auto overflow-hidden touch-none rounded-lg"
      style={{ width, height }}
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
        const { visualWidth, visualHeight, baseRadius } = getVisualSize(
          node,
          isActive
        );

        const bubbleStyle: React.CSSProperties = {
          width: visualWidth,
          height: visualHeight,
          backgroundColor: isActive ? BASE_BORDER_COLOR : "transparent",
          borderColor: isActive ? "white" : BASE_BORDER_COLOR,
          borderWidth: isActive ? 0 : "2px",
          color: isActive ? "white" : BASE_BORDER_COLOR,
        };

        return (
          <motion.div
            key={node.id}
            layout
            onTouchStart={(e) => {
              e.stopPropagation();
              setActiveId(isActive ? null : node.id);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveId(isActive ? null : node.id);
            }}
            className="absolute flex items-center justify-center cursor-pointer select-none"
            style={{
              left: node.x - visualWidth / 2,
              top: node.y - visualHeight / 2,
              zIndex: isActive ? 50 : 1,
            }}
            transition={{
              layout: {
                duration: 0.8,
                type: "spring",
                damping: 15,
                stiffness: 100,
              },
            }}
            whileHover={!isActive && !isMobile ? { scale: 1.1 } : {}}
          >
            <motion.div
              layout
              style={bubbleStyle}
              transition={{
                layout: { duration: 0.5, ease: "easeInOut" },
                backgroundColor: { duration: 0.3 },
                borderColor: { duration: 0.3 },
                borderWidth: { duration: 0.3 },
              }}
              className={`flex items-center justify-center shadow-lg p-4 ${
                isActive ? "rounded-xl" : "rounded-full"
              }`}
            >
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div
                    key="card-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-center w-full h-full flex flex-col justify-center items-center overflow-hidden px-3"
                  >
                    <div
                      className={`font-extrabold mb-1 ${
                        isMobile ? "text-sm" : "text-lg"
                      }`}
                    >
                      {node.skill}
                    </div>
                    <p
                      className={`leading-tight ${
                        isMobile ? "text-[10px]" : "text-sm"
                      }`}
                    >
                      {node.description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="icon-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <Icon size={baseRadius * 0.9} color={bubbleStyle.color} />
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
