"use client";

import Image, { StaticImageData } from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  image: StaticImageData;
  number?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  number = "01",
}: ProjectCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015 }}
      transition={{
        scale: {
          duration: 0.4,
          ease: "easeOut",
        },
      }}
      className="
        group
        relative
        w-full
        h-30
        overflow-hidden
        rounded-4xl
        bg-black
        cursor-pointer
        perspective-[1000px]
      "
    >
      {/* background image */}

      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.08 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={image}
          alt={`Project ${title}`}
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* dark overlay */}

      <div
        className="
          absolute
          inset-0
          bg-linear-to-t
          from-black/90
          via-black/30
          to-black/10
        "
      />

      {/* purple glow */}

      <motion.div
        className="
          absolute
          -right-16
          -top-20
          w-40
          h-40
          rounded-full
          bg-purple-600/30
          blur-[70px]
          pointer-events-none
        "
        whileHover={{
          scale: 1.5,
          opacity: 0.7,
        }}
        transition={{
          duration: 0.8,
        }}
      />

      {/* border */}

      <div
        className="
          absolute
          inset-0
          rounded-4xl
          border
          border-white/10
          group-hover:border-purple-400/40
          transition-colors
          duration-500
        "
      />

      {/* content */}

      <div
        className="
          relative
          z-10
          w-full
          h-full
          p-4
          flex
          flex-col
          justify-between
        "
      >
        {/* top */}

        <div className="flex items-start justify-between">
          <span className="text-xs text-white/50 font-mono">{number}</span>

          <motion.div
            whileHover={{
              rotate: 45,
              scale: 1.15,
            }}
            className="
              w-8
              h-8
              rounded-full
              border
              border-white/20
              bg-black/20
              backdrop-blur-md
              flex
              items-center
              justify-center
            "
          >
            <FaArrowRight size={12} className="text-white" />
          </motion.div>
        </div>

        {/* bottom */}

        <motion.div
          initial={{ y: 5 }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[9px] uppercase tracking-[0.25em] text-purple-300">
                Selected project
              </p>

              <h3
                className="
                  text-lg
                  md:text-xl
                  font-medium
                  tracking-tight
                  text-white
                  leading-none
                  mb-3
                "
              >
                {title}
              </h3>
            </div>

            <p
              className="
                hidden
                md:block
                max-w-62.5
                text-xs
                leading-relaxed
                text-white/50
                group-hover:text-white/80
                transition-colors
                duration-500
              "
            >
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
