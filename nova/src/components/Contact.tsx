"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 25,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 25,
    mass: 0.5,
  });

  const glowX = useTransform(smoothX, [-600, 600], [-60, 60]);

  const glowY = useTransform(smoothY, [-600, 600], [-60, 60]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(event.clientX - rect.left - rect.width / 2);

    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="
        relative
        overflow-hidden

        bg-[#07050c]
        text-white

        px-5
        py-12

        sm:px-8
        sm:py-16

        md:px-12
        md:py-20

        lg:px-16
        lg:py-24

        xl:px-20
      "
    >
      {/* Background */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        {/* Main glow */}

        <motion.div
          style={{
            x: glowX,
            y: glowY,
          }}
          className="
            absolute

            left-1/2
            top-[30%]

            h-65
            w-65

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-violet-600/20

            blur-[90px]

            sm:h-85
            sm:w-85

            md:h-112.5
            md:w-112.5

            lg:h-150
            lg:w-150
          "
        />

        {/* Secondary glow */}

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            -right-30
            top-[45%]

            h-70
            w-70

            rounded-full

            bg-fuchsia-500/10

            blur-[100px]

            sm:h-95
            sm:95

            lg:h-125
            lg:w-125
          "
        />

        {/* Bottom glow */}

        <div
          className="
            absolute

            bottom-37.5
            left-1/2

            h-62.5
            w-100

            -translate-x-1/2

            rounded-full

            bg-violet-700/10

            blur-[100px]

            sm:h-87.5
            sm:w-137.5
          "
        />
      </div>

      {/* Container */}

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-362.5
        "
      >
        {/* Header */}

        <header
          className="
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <motion.span
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-violet-400

                shadow-[0_0_12px_rgba(167,139,250,0.9)]
              "
            />

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-white/40

                sm:text-[9px]

                md:text-[10px]
              "
            >
              NØVA ONLINE
            </span>
          </div>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-purple-500/60

              sm:text-[9px]

              md:text-[10px]
            "
          >
            CONTACT / 04
          </span>
        </header>

        {/* Content mobile-first */}

        <div
          className="
            mt-14

            flex
            flex-col

            sm:mt-16

            md:mt-20

            lg:mt-24
          "
        >
          {/* Title */}

          <div>
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
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
              className="
                mb-6

                flex
                items-center
                gap-3

                sm:mb-8
              "
            >
              <span
                className="
                  h-px
                  w-7
                  bg-violet-400/60

                  sm:w-10
                "
              />

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.35em]
                  text-violet-300/60

                  sm:text-[9px]
                "
              >
                Have an idea?
              </span>
            </motion.div>

            {/* LET'S */}

            <div className="overflow-hidden">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[18vw]

                  font-medium
                  leading-[0.78]
                  tracking-[-0.075em]

                  sm:text-[14vw]

                  md:text-[11vw]

                  lg:text-[8vw]

                  xl:text-[7.2rem]
                "
              >
                LET&apos;S
              </motion.h1>
            </div>

            {/* MAKE */}

            <div className="overflow-hidden">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[18vw]

                  font-medium
                  leading-[0.78]
                  tracking-[-0.075em]

                  sm:text-[14vw]

                  md:text-[11vw]

                  lg:text-[8vw]

                  xl:text-[7.2rem]
                "
              >
                MAKE
              </motion.h1>
            </div>

            {/* SOMETHING */}

            <div className="overflow-hidden">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  whitespace-nowrap

                  text-[14.5vw]

                  font-medium
                  leading-[0.8]
                  tracking-[-0.085em]

                  text-transparent

                  [-webkit-text-stroke:1px_rgba(255,255,255,0.23)]

                  sm:text-[11.8vw]

                  md:text-[10vw]

                  lg:text-[7.4vw]

                  xl:text-[6.8rem]
                "
              >
                SOMETHING
              </motion.h1>
            </div>

            {/* UNEXPECTED */}

            <div className="overflow-hidden">
              <motion.h1
                initial={{
                  y: "100%",
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  whitespace-nowrap

                  bg-linear-to-r
                  from-violet-200
                  via-fuchsia-300
                  to-violet-500

                  bg-clip-text

                  text-[14.5vw]

                  font-medium
                  leading-[0.8]
                  tracking-[-0.085em]

                  text-transparent

                  sm:text-[11.8vw]

                  md:text-[10vw]

                  lg:text-[7.4vw]

                  xl:text-[6.8rem]
                "
              >
                UNEXPECTED.
              </motion.h1>
            </div>
          </div>

          {/* Description */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
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
              delay: 0.3,
            }}
            className="
              mt-8

              flex
              max-w-sm
              items-start
              gap-3

              sm:mt-10
              sm:gap-4

              lg:mt-12
            "
          >
            <span
              className="
                mt-2
                h-px
                w-7
                shrink-0
                bg-white/20

                sm:w-10
              "
            />

            <p
              className="
                text-[11px]
                leading-relaxed
                text-white/35

                sm:text-xs

                md:text-sm
              "
            >
              Tell us what you&apos;re building. We&apos;ll turn the idea into
              something worth remembering.
            </p>
          </motion.div>

          {/* Form */}

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
              duration: 0.8,
              delay: 0.15,
            }}
            className="
              mt-12
              w-full
              rounded-[1.25rem]
              border
              border-white/8
              bg-white/[0.035]
              p-5
              backdrop-blur-xl
              sm:mt-14
              sm:rounded-3xl
              sm:p-7
              md:p-8
              lg:mt-0
              lg:w-[500px]
              lg:max-w-[500px]
              lg:self-end
              lg:p-9
              xl:w-[540px]
              xl:max-w-[540px]
              xl:p-10
            "
          >
            {/* Form heading */}

            <div
              className="
                mb-8

                flex
                items-start
                justify-between
              "
            >
              <div>
                <span
                  className="
                    block

                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-white/50

                    sm:text-[10px]
                  "
                >
                  Start a project
                </span>

                <span
                  className="
                    mt-2
                    block

                    text-[11px]
                    text-white/30

                    sm:text-xs
                  "
                >
                  Let&apos;s create something different.
                </span>
              </div>

              <motion.div
                whileHover={{
                  rotate: 45,
                }}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/30

                  text-white/50
                "
              >
                <ArrowUpRight size={15} />
              </motion.div>
            </div>

            {/* Form */}

            <form
              onSubmit={(e) => e.preventDefault()}
              className="
                space-y-7
                sm:space-y-8
              "
            >
              {/* NAME */}

              <label className="block">
                <span
                  className="
                    mb-2
                    block

                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/50

                    sm:text-[9px]
                  "
                >
                  01 / Name
                </span>

                <input
                  type="text"
                  placeholder="Your name"
                  className="
                    w-full

                    border-b
                    border-white/30

                    bg-transparent

                    pb-3

                    text-sm
                    font-light
                    text-white

                    outline-none

                    placeholder:text-white/20

                    transition-colors
                    duration-300

                    focus:border-violet-400/70

                    sm:text-base
                  "
                />
              </label>

              {/* EMAIL */}

              <label className="block">
                <span
                  className="
                    mb-2
                    block

                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/50

                    sm:text-[9px]
                  "
                >
                  02 / Email
                </span>

                <input
                  type="email"
                  placeholder="you@email.com"
                  className="
                    w-full

                    border-b
                    border-white/30

                    bg-transparent

                    pb-3

                    text-sm
                    font-light
                    text-white

                    outline-none

                    placeholder:text-white/20

                    transition-colors
                    duration-300

                    focus:border-violet-400/70

                    sm:text-base
                  "
                />
              </label>

              {/* COMPANY */}

              <label className="block">
                <span
                  className="
                    mb-2
                    block

                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/50

                    sm:text-[9px]
                  "
                >
                  03 / Company
                </span>

                <input
                  type="text"
                  placeholder="Company / Brand"
                  className="
                    w-full

                    border-b
                    border-white/30

                    bg-transparent

                    pb-3

                    text-sm
                    font-light
                    text-white

                    outline-none

                    placeholder:text-white/20

                    transition-colors
                    duration-300

                    focus:border-violet-400/70

                    sm:text-base
                  "
                />
              </label>

              {/* MESSAGE */}

              <label className="block">
                <span
                  className="
                    mb-2
                    block

                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/50

                    sm:text-[9px]
                  "
                >
                  04 / Message
                </span>

                <textarea
                  rows={2}
                  placeholder="What are we creating?"
                  className="
                    w-full

                    resize-none

                    border-b
                    border-white/30

                    bg-transparent

                    pb-3

                    text-sm
                    font-light
                    leading-relaxed
                    text-white

                    outline-none

                    placeholder:text-white/20

                    transition-colors
                    duration-300

                    focus:border-violet-400/70

                    sm:text-base
                  "
                />
              </label>

              {/* BUTTON */}

              <motion.button
                type="submit"
                whileTap={{
                  scale: 0.97,
                }}
                whileHover="hover"
                className="
                  group

                  relative

                  flex

                  min-h-13

                  w-full

                  items-center
                  justify-between

                  overflow-hidden

                  rounded-full

                  bg-white

                  px-5

                  text-black
                "
              >
                <motion.span
                  initial={{
                    scaleX: 0,
                  }}
                  variants={{
                    hover: {
                      scaleX: 1,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    absolute
                    inset-0

                    origin-left

                    bg-violet-300
                  "
                />

                <span
                  className="
                    relative
                    z-10

                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.18em]

                    sm:text-[10px]
                  "
                >
                  Send transmission
                </span>

                <motion.span
                  variants={{
                    hover: {
                      x: 4,
                      rotate: -45,
                    },
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    relative
                    z-10
                  "
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
            </form>
          </motion.div>

          {/* Orbital */}

          <div
            className="
              pointer-events-none
              absolute

              hidden
              lg:block

              left-[20%]
              top-[72%]

              h-80
              w-80

              -translate-x-1/2
              -translate-y-1/2

              xl:left-[20%]
              xl:top-[70%]

              xl:h-100
              xl:w-100
            "
          >
            {/* Outer orbit */}

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
                inset-0

                rounded-full

                border
                border-violet-400/10
              "
            >
              <span
                className="
                  absolute

                  left-1/2
                  -top-0.5

                  h-1
                  w-1

                  rounded-full

                  bg-violet-300

                  shadow-[0_0_12px_rgba(196,181,253,0.9)]
                "
              />
            </motion.div>

            {/* Inner orbit */}

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute

                left-[20%]
                top-[20%]

                h-[60%]
                w-[60%]

                rounded-full

                border
                border-fuchsia-400/10
              "
            >
              <span
                className="
                  absolute

                  -right-0.5
                  top-1/2

                  h-1
                  w-1

                  rounded-full

                  bg-fuchsia-300
                "
              />
            </motion.div>

            {/* Core */}

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute

                left-1/2
                top-1/2

                h-20
                w-20

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                bg-linear-to-br
                from-violet-200
                via-violet-500
                to-fuchsia-600

                shadow-[0_0_45px_rgba(139,92,246,0.6)]

                xl:h-30
                xl:w-30
              "
            />
          </div>
        </div>

        {/* Footer */}

        <footer
          className="
            mt-12

            grid

            grid-cols-1

            gap-4

            border-t
            border-white/8

            pt-5

            sm:mt-14
            sm:grid-cols-2

            md:mt-16

            lg:mt-20
            lg:flex
            lg:items-center
            lg:justify-between
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/20

              sm:text-[9px]

              md:text-[10px]
            "
          >
            © 2026 NØVA STUDIO
          </span>

          <a
            href="mailto:hello@nova.studio"
            className="
              flex
              items-center
              gap-2

              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/25

              transition-colors
              hover:text-white/60

              sm:text-[9px]

              md:text-[10px]
            "
          >
            <Mail size={12} />
            hello@nova.studio
          </a>

          <span
            className="
              flex
              items-center
              gap-2

              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/20

              sm:text-[9px]

              md:text-[10px]
            "
          >
            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-emerald-400/70

                shadow-[0_0_8px_rgba(52,211,153,0.7)]
              "
            />
            Available for select projects
          </span>

          <span
            className="
              flex
              items-center
              gap-2

              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/20

              sm:text-[9px]

              md:text-[10px]
            "
          >
            <MapPin size={12} />
            Colombia — Worldwide
          </span>
        </footer>
      </div>
    </section>
  );
}
