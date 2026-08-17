"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaArrowDown, FaCode, FaCube, FaPalette } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

const skills = [
  {
    label: "Design",
    icon: FaPalette,
    position: "top-[8%] left-[8%]",
  },
  {
    label: "Code",
    icon: FaCode,
    position: "top-[15%] right-[8%]",
  },
  {
    label: "3D",
    icon: FaCube,
    position: "bottom-[15%] left-[10%]",
  },
];

const About = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const orbX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black
        px-6
        py-24
        text-white
      "
    >
      {/* background */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            bg-[linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)]
            bg-size-[70px_70px]
          "
        />

        {/* Main purple glow */}

        <motion.div
          style={{
            x: orbX,
            y: orbY,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-112.5
            h-112.5
            rounded-full
            bg-purple-700/20
            blur-[150px]
          "
        />

        {/* Secondary glow */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[15%]
            top-[20%]
            w-40
            h-40
            rounded-full
            bg-violet-500
            blur-[100px]
          "
        />
      </div>

      {/* header */}

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="flex items-center text-purple-400 mb-4 text-xs">
            <TbPointFilled className="text-sm text-purple-400" />
            03
            <p
              className="
              ml-2
            text-xs
            uppercase
            tracking-[0.35em]
            text-purple-400
          "
            >
              About NØVA
            </p>
          </div>

          <h2
            className="
            max-w-4xl
            text-4xl
            font-medium
            tracking-tight
            md:text-7xl
            lg:text-8xl
          "
          >
            We create
            <span className="text-purple-400"> digital</span>
            <br />
            experiences.
          </h2>
        </motion.div>

        {/* core */}

        <div
          className="
          relative
          mx-auto
          mt-20
          h-140
          max-w-6xl
        "
        >
          {/* orbit */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-105
              w-105
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-white/10
            "
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-75
              w-75
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-purple-500/20
            "
          />

          {/* floating skills */}

          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.label}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.6,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -6,
                }}
                className={`
                  absolute
                  ${skill.position}
                  z-20
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  bg-white/4
                  px-5
                  py-3
                  backdrop-blur-xl
                `}
              >
                <Icon className="text-purple-400" />

                <span
                  className="
                  text-sm
                  text-white/70
                "
                >
                  {skill.label}
                </span>
              </motion.div>
            );
          })}

          {/* nova core */}

          <motion.div
            style={{
              x: useTransform(smoothX, [-0.5, 0.5], [-12, 12]),
              y: useTransform(smoothY, [-0.5, 0.5], [-12, 12]),
            }}
            className="
              absolute
              left-1/2
              top-1/2
              z-10
              flex
              h-56
              w-56
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-purple-400/20
              bg-black/60
              shadow-[0_0_100px_rgba(124,58,237,0.25)]
              backdrop-blur-xl
            "
          >
            {/* inner glow */}

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="
                absolute
                h-32
                w-32
                rounded-full
                bg-purple-600/20
                blur-2xl
              "
            />

            <div className="relative text-center">
              <span
                className="
                block
                text-5xl
                font-semibold
                tracking-tight
              "
              >
                NØVA
              </span>

              <span
                className="
                mt-2
                block
                text-[9px]
                uppercase
                tracking-[0.4em]
                text-white/40
              "
              >
                Digital studio
              </span>
            </div>
          </motion.div>

          {/* orbit dots */}

          <motion.span
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-105
              w-105
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <span
              className="
                absolute
                left-1/2
                top-0
                h-2
                w-2
                -translate-x-1/2
                rounded-full
                bg-purple-400
                shadow-[0_0_20px_rgba(168,85,247,1)]
              "
            />
          </motion.span>

          <motion.span
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-75
              w-75
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <span
              className="
                absolute
                left-1/2
                top-0
                h-2
                w-2
                -translate-x-1/2
                rounded-full
                bg-purple-400
                shadow-[0_0_20px_rgba(168,85,247,1)]
              "
            />
          </motion.span>
        </div>

        {/* philosophy */}

        <div
          className="
          grid
          gap-10
          border-t
          border-white/10
          pt-12
          md:grid-cols-2
        "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <span
              className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-white/30
            "
            >
              Our philosophy
            </span>

            <p
              className="
              mt-5
              max-w-xl
              text-2xl
              leading-relaxed
              text-white/80
            "
            >
              We believe technology should feel
              <span className="text-white"> alive.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.15,
              duration: 0.7,
            }}
            className="flex flex-col justify-between"
          >
            <p
              className="
              max-w-xl
              text-sm
              leading-relaxed
              text-white/40
            "
            >
              NØVA combines design, technology, motion and three-dimensional
              experiences to create digital products that don &apos; t simply
              work — they leave an impression.
            </p>

            <motion.div
              whileHover={{
                x: 8,
              }}
              className="
                mt-8
                flex
                items-center
                gap-3
                text-xs
                uppercase
                tracking-[0.25em]
                text-purple-400
                cursor-pointer
              "
            >
              Explore our universe
              <FaArrowDown className="-rotate-90deg" size={10} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
