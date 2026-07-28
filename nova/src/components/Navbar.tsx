"use client";

import Image from "next/image";
import NovaLogo from "@/assets/NovaLogo.png";
import Menu from "@/assets/menu.png";
import { FiMenu, FiX, FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.35,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const menuIconsVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      },
    },
  };

  const itemIconsVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const arrowVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 8,
      filter: "blur(6px)",
    },

    hover: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="flex items-center justify-between pl-1 pr-4 h-16 bg-black">
        <Image
          src={NovaLogo}
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer"
        />
        <ul className="hidden">
          <li>Home</li>
          <li>Studio</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button
          onClick={toggleMenu}
          className="rounded-full bg-linear-to-r from-violet-600 via-purple-500 to-cyan-400 p-px shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] cursor-pointer"
        >
          <span className="flex items-center justify-center rounded-full bg-black p-2">
            <FiMenu className="text-white" />
          </span>
        </button>

        {/* Menu mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                clipPath: "circle(0% at 95% 5%)",
              }}
              animate={{
                clipPath: "circle(150% at 95% 5%)",
              }}
              exit={{
                clipPath: "circle(0% at 95% 5%)",
              }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1] as const,
              }}
              className="fixed inset-0 z-50 bg-black"
            >
              <motion.div className="flex items-center justify-between w-full h-16 pr-4 pl-1">
                <Image
                  src={NovaLogo}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
                <button
                  onClick={toggleMenu}
                  className="rounded-full bg-linear-to-r from-violet-600/50 via-purple-500 to-purple-400/50 p-px shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] cursor-pointer"
                >
                  <span className="flex items-center justify-center rounded-full bg-black p-2">
                    <FiX className="text-white" />
                  </span>
                </button>
              </motion.div>
              <div className="w-full h-full">
                <Image
                  src={Menu}
                  alt="Logo"
                  className="w-full h-[calc(100vh-160px)] object-cover absolute bottom-0 right-0 -z-10"
                />

                <motion.ul
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-white text-[1.5rem] font-light w-2/3 h-1/2 flex mt-5 flex-col justify-center gap-8 px-4"
                >
                  <motion.li
                    variants={itemVariants}
                    whileHover="hover"
                    className="group relative w-fit cursor-pointer flex items-center gap-2"
                  >
                    <motion.span
                      className="
    pointer-events-none
    absolute
    left-1/2
    bottom-0
    w-16
    h-8
    -translate-x-1/2
    rounded-full
    bg-purple-500/30
    blur-xl
  "
                      initial={{
                        opacity: 0,
                        x: 0,
                      }}
                      variants={{
                        hover: {
                          opacity: 1,
                          x: -10,
                          transition: {
                            duration: 0.45,
                            ease: "easeOut",
                          },
                        },
                      }}
                    />
                    <span className="text-sm text-purple-500 font-medium translate-y-0.5">
                      01
                    </span>
                    Home
                    <Link href="/" className="ml-4">
                      <motion.span variants={arrowVariants}>
                        <FiArrowUpRight className="text-purple-500 scale-0 group-hover:scale-100 transition-all duration-200 text-base w-5 h-5 translate-y-0.5 ml-4" />
                      </motion.span>
                    </Link>
                    <motion.span
                      className="
    pointer-events-none
    absolute
    left-0
    right-0
    -bottom-2
    h-px
    bg-linear-to-r
    from-transparent
    via-purple-500/70
    to-transparent
    blur-[2px]
  "
                      initial={{
                        opacity: 0,
                        scaleX: 0.5,
                      }}
                      variants={{
                        hover: {
                          opacity: 1,
                          scaleX: 1,
                          transition: {
                            duration: 0.4,
                            ease: "easeOut",
                          },
                        },
                      }}
                    />
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    whileHover="hover"
                    className="group relative w-fit cursor-pointer flex items-center gap-2"
                  >
                    <motion.span
                      className="
    pointer-events-none
    absolute
    left-1/2
    bottom-0
    w-16
    h-8
    -translate-x-1/2
    rounded-full
    bg-purple-500/30
    blur-xl
  "
                      initial={{
                        opacity: 0,
                        x: 0,
                      }}
                      variants={{
                        hover: {
                          opacity: 1,
                          x: -10,
                          transition: {
                            duration: 0.45,
                            ease: "easeOut",
                          },
                        },
                      }}
                    />
                    <span className="text-sm text-purple-500 font-medium translate-y-0.5">
                      02
                    </span>
                    Studio
                    <Link href="/" className="ml-4">
                      <motion.span variants={arrowVariants}>
                        <FiArrowUpRight className="text-purple-500 scale-0 group-hover:scale-100 transition-all duration-200 text-base w-5 h-5 translate-y-0.5 ml-4" />
                      </motion.span>
                    </Link>
                    <motion.span
                      className="
    pointer-events-none
    absolute
    left-0
    right-0
    -bottom-2
    h-px
    bg-linear-to-r
    from-transparent
    via-purple-500/70
    to-transparent
    blur-[2px]
  "
                      initial={{
                        opacity: 0,
                        scaleX: 0.5,
                      }}
                      variants={{
                        hover: {
                          opacity: 1,
                          scaleX: 1,
                          transition: {
                            duration: 0.4,
                            ease: "easeOut",
                          },
                        },
                      }}
                    />
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    whileHover="hover"
                    className="group relative w-fit cursor-pointer flex items-center gap-2"
                  >
                    <motion.span
                      className="
    pointer-events-none
    absolute
    left-1/2
    bottom-0
    w-16
    h-8
    -translate-x-1/2
    rounded-full
    bg-purple-500/30
    blur-xl
  "
                      initial={{
                        opacity: 0,
                        x: 0,
                      }}
                      variants={{
                        hover: {
                          opacity: 1,
                          x: -10,
                          transition: {
                            duration: 0.45,
                            ease: "easeOut",
                          },
                        },
                      }}
                    />
                    <span className="text-sm text-purple-500 font-medium translate-y-0.5">
                      03
                    </span>
                    About
                    <Link href="/" className="ml-4">
                      <motion.span variants={arrowVariants}>
                        <FiArrowUpRight className="text-purple-500 scale-0 group-hover:scale-100 transition-all duration-200 text-base w-5 h-5 translate-y-0.5 ml-4" />
                      </motion.span>
                    </Link>
                    <motion.span
                      className="
    pointer-events-none
    absolute
    left-0
    right-0
    -bottom-2
    h-px
    bg-linear-to-r
    from-transparent
    via-purple-500/70
    to-transparent
    blur-[2px]
  "
                      initial={{
                        opacity: 0,
                        scaleX: 0.5,
                      }}
                      variants={{
                        hover: {
                          opacity: 1,
                          scaleX: 1,
                          transition: {
                            duration: 0.4,
                            ease: "easeOut",
                          },
                        },
                      }}
                    />
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    whileHover="hover"
                    className="group relative w-fit cursor-pointer flex items-center gap-2"
                  >
                    <motion.span
                      className="
    pointer-events-none
    absolute
    left-1/2
    bottom-0
    w-16
    h-8
    -translate-x-1/2
    rounded-full
    bg-purple-500/30
    blur-xl
  "
                      initial={{
                        opacity: 0,
                        x: 0,
                      }}
                      variants={{
                        hover: {
                          opacity: 1,
                          x: -10,
                          transition: {
                            duration: 0.45,
                            ease: "easeOut",
                          },
                        },
                      }}
                    />
                    <span className="text-sm text-purple-500 font-medium translate-y-0.5">
                      04
                    </span>
                    Contact
                    <Link href="/" className="ml-4">
                      <motion.span variants={arrowVariants}>
                        <FiArrowUpRight className="text-purple-500 scale-0 group-hover:scale-100 transition-all duration-200 text-base w-5 h-5 translate-y-0.5 ml-4" />
                      </motion.span>
                    </Link>
                    <motion.span
                      className="
    pointer-events-none
    absolute
    left-0
    right-0
    -bottom-2
    h-px
    bg-linear-to-r
    from-transparent
    via-purple-500/70
    to-transparent
    blur-[2px]
  "
                      initial={{
                        opacity: 0,
                        scaleX: 0.5,
                      }}
                      variants={{
                        hover: {
                          opacity: 1,
                          scaleX: 1,
                          transition: {
                            duration: 0.4,
                            ease: "easeOut",
                          },
                        },
                      }}
                    />
                  </motion.li>
                </motion.ul>

                {/* Start a project card */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 50,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="text-white flex items-center justify-center gap-4 w-[90%] px-4 py-2 mx-auto bg-black/70 backdrop:backdrop-blur-md rounded-xl mt-10 cursor-pointer"
                >
                  <button className="rounded-full bg-linear-to-r opacity-80 from-violet-600/50 via-purple-500 to-purple-400/50 p-px shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] cursor-pointer">
                    <motion.span
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center rounded-full bg-black p-2"
                    >
                      <FiArrowUpRight className="text-white" />
                    </motion.span>
                  </button>
                  <div>
                    <h3 className="text-base">Start a project</h3>
                    <p className="text-[12px] text-white/70">
                      Let &apos;s create something <br /> extraordinary
                    </p>
                  </div>
                  <FiArrowRight className="text-purple-500 text-base shadow-[0_0_30px_rgba(168,85,247,0.25)]" />
                </motion.div>

                {/* Footer of icons */}

                <div className="text-white flex items-center mt-5">
                  <motion.ul
                    variants={menuIconsVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-between w-1/2 mx-auto gap-4"
                  >
                    <motion.li
                      variants={itemIconsVariants}
                      className="cursor-pointer bg-white/10 p-2 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                    >
                      <FaLinkedinIn />
                    </motion.li>
                    <motion.li
                      variants={itemIconsVariants}
                      className="cursor-pointer bg-white/10 p-2 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                    >
                      <FaGithub />
                    </motion.li>
                    <motion.li
                      variants={itemIconsVariants}
                      className="cursor-pointer bg-white/10 p-2 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                    >
                      <MdEmail />
                    </motion.li>
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
