"use client";

import { motion, Variants } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { TbNorthStar, TbPointFilled } from "react-icons/tb";
import { Poppins } from "next/font/google";

import Canvas from "@/components/Canvas";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const statsVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const statVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Hero = () => {
  return (
    <header
      className="
        relative
        z-10
        min-h-screen
        w-full
        overflow-hidden
        px-4
        text-white
        sm:px-6
        md:px-10
        lg:px-16
      "
    >
      <div className="absolute inset-0 z-10">
        <Canvas />
      </div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          z-20
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          justify-center
          gap-10
          pt-6
          sm:pt-10
          md:gap-14
          md:pt-16
          lg:min-h-[calc(100vh-80px)]
          lg:items-start
          lg:justify-between
          lg:gap-20
        "
      >
        <motion.article
          variants={itemVariants}
          className="
            w-full
            max-w-xl
          "
        >
          <motion.div
            variants={itemVariants}
            className="
              flex
              w-fit
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-purple-600/40
              px-3
              py-1
              sm:px-4
            "
          >
            <TbPointFilled className="text-sm text-purple-400" />

            <h2
              className="
                text-[9px]
                tracking-[0.18em]
                text-purple-500/80
                sm:text-[10px]
              "
            >
              DIGITAL EXPERIENCES STUDIO
            </h2>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`
              ${poppins.className}
              mt-4
              text-[1.6rem]
              leading-[1.15]
              tracking-[-0.03em]
              text-white/80

              sm:text-3xl

              md:text-5xl

              lg:text-6xl

              xl:text-7xl
            `}
          >
            We design
            <br />
            digital experiences
            <br />
            that <span className="italic text-purple-400/80">move people</span>.
          </motion.h1>

          <motion.span
            variants={itemVariants}
            className="
              mt-4
              block
              h-px
              w-12
              bg-purple-400/40
              sm:mt-5
            "
          />

          <motion.p
            variants={itemVariants}
            className="
              mt-4
              max-w-md
              text-[12px]
              leading-relaxed
              text-white/60

              sm:text-sm

              md:text-base
            "
          >
            Creating beautiful, functional and meaningful digital products that
            connect brands with people.
          </motion.p>

          {/* Main button */}

          <motion.button
            variants={itemVariants}
            whileHover={{
              y: -3,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              group
              relative
              mt-4
              flex
              w-fit
              cursor-pointer
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-3xl
              border
              border-purple-400/70
              bg-transparent
              px-4
              py-3
              shadow-[0_0_8px_#541379]

              sm:mt-6
              sm:px-5

              hover:border-purple-300
              hover:shadow-[0_0_25px_#541379]
              z-200
            "
          >
            {/* Glow */}

            <motion.span
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileHover={{
                opacity: 1,
                scale: 1.1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                absolute
                left-1/2
                top-0
                z-0
                h-8
                w-[90%]
                -translate-x-1/2
                rounded-3xl
                bg-[#40105c33]
                shadow-[0_0_20px_#40105c]
                backdrop-blur-xl
              "
            />

            <span
              className="
                relative
                z-20
                text-[12px]
                font-semibold
                tracking-[0.08em]
                text-white/80
              "
            >
              EXPLORE OUR STUDIO
            </span>

            <motion.span
              whileHover={{
                x: 3,
                y: -3,
              }}
              className="relative z-10"
            >
              <FiArrowUpRight />
            </motion.span>
          </motion.button>
        </motion.article>

        {/* Right side */}

        <motion.div
          variants={containerVariants}
          className="
            flex
            w-full
            flex-col
            gap-6
          "
        >
          {/* Stats */}

          <motion.article
            variants={itemVariants}
            className="
              w-full
              lg:w-auto
            "
          >
            <motion.ul
              variants={statsVariants}
              className="
                flex
                w-full
                items-stretch
                justify-center

                lg:w-auto
              "
            >
              {/* Projects completed */}

              <motion.li
                variants={statVariants}
                className="
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  px-2

                  sm:px-6

                  lg:min-w-30
                "
              >
                <motion.h3
                  whileHover={{
                    scale: 1.08,
                    textShadow: "0 0 20px rgba(168,85,247,.5)",
                  }}
                  className="
                    text-xl
                    font-medium
                    text-purple-400
                    sm:text-2xl
                    lg:text-3xl
                  "
                >
                  32+
                </motion.h3>

                <p
                  className="
                    text-center
                    text-[8px]
                    tracking-[0.08em]
                    text-white/50

                    sm:text-[9px]

                    lg:text-[10px]
                  "
                >
                  PROJECTS COMPLETED
                </p>
              </motion.li>

              <motion.span
                variants={itemVariants}
                className="
                  w-px
                  h-[70%]
                  self-center
                  border-r
                  border-purple-300/40
                "
              />

              <motion.li
                variants={statVariants}
                className="
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  px-2

                  sm:px-6

                  lg:min-w-30
                "
              >
                <motion.h3
                  whileHover={{
                    scale: 1.08,
                    textShadow: "0 0 20px rgba(168,85,247,.5)",
                  }}
                  className="
                    text-xl
                    font-medium
                    text-purple-400
                    sm:text-2xl
                    lg:text-3xl
                  "
                >
                  100+
                </motion.h3>

                <p
                  className="
                    text-center
                    text-[8px]
                    tracking-[0.08em]
                    text-white/50

                    sm:text-[9px]

                    lg:text-[10px]
                  "
                >
                  HAPPY CLIENTS
                </p>
              </motion.li>

              <motion.span
                variants={itemVariants}
                className="
                  w-px
                  h-[70%]
                  self-center
                  border-r
                  border-purple-300/40
                "
              />

              <motion.li
                variants={statVariants}
                className="
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  px-2

                  sm:px-6

                  lg:min-w-30
                "
              >
                <motion.h3
                  whileHover={{
                    scale: 1.08,
                    textShadow: "0 0 20px rgba(168,85,247,.5)",
                  }}
                  className="
                    text-xl
                    font-medium
                    text-purple-400
                    sm:text-2xl
                    lg:text-3xl
                  "
                >
                  4+
                </motion.h3>

                <p
                  className="
                    text-center
                    text-[8px]
                    tracking-[0.08em]
                    text-white/50

                    sm:text-[9px]

                    lg:text-[10px]
                  "
                >
                  YEARS OF EXPERIENCE
                </p>
              </motion.li>
            </motion.ul>
          </motion.article>

          {/* Our approach */}

          <motion.article
            variants={itemVariants}
            className="
              flex
              w-full
              lg:items-center
              lg:justify-center
            "
          >
            <motion.button
              initial="rest"
              whileHover="hover"
              whileTap={{
                scale: 0.98,
              }}
              className="
                group
                relative
                flex
                w-full
                max-w-sm
                items-center
                gap-3
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/2
                p-2
                text-left
                backdrop-blur-xl
                transition-colors
                duration-500

                lg:max-w-md

                hover:border-purple-400/40
                hover:bg-white/4
              "
            >
              <motion.div
                variants={{
                  rest: {
                    x: -20,
                    opacity: 0,
                    scale: 0.8,
                  },
                  hover: {
                    x: 0,
                    opacity: 1,
                    scale: 1.2,
                  },
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  left-0
                  top-1/2
                  h-32
                  w-32
                  -translate-y-1/2
                  rounded-full
                  bg-purple-500/20
                  blur-3xl
                "
              />

              <motion.div
                variants={{
                  rest: {
                    scale: 1,
                    rotate: 0,
                  },
                  hover: {
                    scale: 1.1,
                    rotate: 12,
                  },
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-purple-400/30
                  bg-linear-to-br
                  from-purple-500/20
                  to-transparent
                  shadow-[0_0_35px_rgba(168,85,247,.25)]

                  sm:h-11
                  sm:w-11
                "
              >
                <TbNorthStar className="text-xl text-purple-300" />
              </motion.div>

              <div className="relative flex flex-col text-left">
                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    text-purple-400
                  "
                >
                  OUR APPROACH
                </span>

                <span
                  className="
                    mt-1
                    text-[10px]
                    leading-relaxed
                    text-white/80

                    sm:text-[11px]
                  "
                >
                  Strategy. Design. Development.
                  <br />
                  All in one flow.
                </span>
              </div>

              <motion.div
                variants={{
                  rest: {
                    x: 0,
                  },
                  hover: {
                    x: 4,
                  },
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  ml-auto
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/3
                  transition-all
                  duration-500

                  group-hover:border-purple-400/40
                  group-hover:bg-purple-500/10
                "
              >
                <FiArrowRight
                  className="
                    text-white/60
                    transition-colors
                    duration-500
                    group-hover:text-purple-300
                  "
                />
              </motion.div>
            </motion.button>
          </motion.article>
        </motion.div>
      </motion.section>
    </header>
  );
};

export default Hero;
