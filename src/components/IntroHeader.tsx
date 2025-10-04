import { motion } from "framer-motion";
import Image from "next/image";

const IntroHeader = () => {
  return (
    <motion.div
      className="z-1 mt-24 mb-8 flex flex-col items-center text-center md:mt-4 md:mb-12 gap-2"
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
  );
};

export default IntroHeader;