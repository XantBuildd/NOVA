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

  // Tilt

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 180,
    damping: 22,
    mass: 0.5,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 180,
    damping: 22,
    mass: 0.5,
  });

  // Mouse

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
      whileHover={{
        scale: 1.012,
      }}
      transition={{
        scale: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="
        group
        relative
        w-full
        h-55
        sm:h-65
        md:h-75
        lg:h-85
        xl:h-95
        overflow-hidden
        rounded-3xl
        sm:rounded-4xl
        lg:rounded-[2.5rem]
        bg-black
        cursor-pointer
        perspective-ditant
        transform-gpu
        will-change-transform
      "
    >
      {/* Image */}

      <motion.div
        className="
          absolute
          inset-0
          transform-gpu
        "
        whileHover={{
          scale: 1.06,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={image}
          alt={`Project ${title}`}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 90vw,
            1200px
          "
          className="
            object-cover
            object-center
            transition-transform
            duration-700
          "
        />
      </motion.div>

      {/* Image Gradient */}

      <div
        className="
          absolute
          inset-0
          bg-linear-to-t
          from-black/95
          via-black/35
          to-black/5
        "
      />

      {/* Extra Mobile Gradient */}

      <div
        className="
          absolute
          inset-0
          bg-linear-to-r
          from-black/20
          via-transparent
          to-black/20
          pointer-events-none
        "
      />

      {/* Purple Glow */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-44
          w-44
          sm:h-52
          sm:w-52
          rounded-full
          bg-purple-600/25
          blur-[70px]

          sm:blur-[85px]
        "
        whileHover={{
          scale: 1.4,
          opacity: 0.8,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Border */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-3xl
          sm:rounded-4xl
          lg:rounded-[2.5rem]
          border
          border-white/10
        "
        whileHover={{
          borderColor: "rgba(192,132,252,0.4)",
        }}
        transition={{
          duration: 0.5,
        }}
      />

      {/* Content */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          flex-col
          justify-between
          p-4
          sm:p-5
          md:p-6
          lg:p-7
          xl:p-8
        "
      >
        {/* Top */}

        <div className="flex items-start justify-between">
          {/* Number */}

          <span
            className="
              font-mono
              text-[10px]
              tracking-wider
              text-white/50

              sm:text-xs
            "
          >
            {number}
          </span>

          {/* Arrow */}

          <motion.div
            whileHover={{
              rotate: 45,
              scale: 1.12,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/20
              backdrop-blur-md
              sm:h-9
              sm:w-9
              md:h-10
              md:w-10
            "
          >
            <FaArrowRight
              size={11}
              className="
                text-white

                sm:text-xs
              "
            />
          </motion.div>
        </div>

        {/* Bottom */}

        <motion.div
          initial={{
            y: 6,
          }}
          whileHover={{
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="
              flex
              flex-col
              gap-3

              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            {/* Project info */}

            <div className="min-w-0">
              <p
                className="
                  mb-1.5

                  text-[8px]
                  uppercase
                  tracking-[0.25em]

                  text-purple-300/90

                  sm:text-[9px]
                "
              >
                Selected project
              </p>

              <h3
                className="
                  text-lg
                  font-medium
                  leading-none
                  tracking-[-0.02em]
                  text-white

                  sm:text-xl

                  md:text-2xl

                  lg:text-3xl
                "
              >
                {title}
              </h3>
            </div>

            {/* Description */}

            <p
              className="
                max-w-full

                text-[10px]
                leading-normal

                text-white/50

                transition-colors
                duration-500

                sm:text-xs

                md:max-w-55

                lg:max-w-70

                md:group-hover:text-white/80
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
