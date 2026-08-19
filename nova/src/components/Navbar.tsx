"use client";

import Image from "next/image";
import NovaLogo from "@/assets/NovaLogo.png";
import Menu from "@/assets/menu.png";
import { FiMenu, FiX, FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  {
    id: "home",
    number: "01",
    label: "Home",
  },
  {
    id: "studio",
    number: "02",
    label: "Studio",
  },
  {
    id: "about",
    number: "03",
    label: "About",
  },
  {
    id: "contact",
    number: "04",
    label: "Contact",
  },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // detect scroll to hide/show

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  //scroll to section

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    setActiveSection(id);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsOpen(false);
  };

  // detect current section

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        // the section is visible if it is at least 50% visible
        rootMargin: "-20% 0px -60% 0px",

        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const menuVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.35,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <motion.nav
        initial={{
          y: 0,
          opacity: 1,
        }}
        animate={{
          y: isVisible ? 0 : -120,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          fixed
          top-0
          left-0
          right-0
          z-100
          flex
          h-16
          items-center
          justify-between
          px-1
          pr-4
          border-b
          border-white/6
          bg-black/60
          backdrop-blur-xl
          md:px-6
          lg:h-18
          lg:px-8
        "
      >
        <Image
          src={NovaLogo}
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer"
        />
        <ul
          className="
              hidden

              md:flex
              md:items-center
              md:gap-1

              lg:gap-2
            "
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="
                    relative

                    rounded-full

                    px-4
                    py-2

                    text-[9px]
                    uppercase
                    tracking-[0.2em]

                    transition-colors
                    duration-300

                    lg:px-5
                    lg:text-[10px]
                  "
                >
                  {/* Active background */}

                  {isActive && (
                    <motion.span
                      layoutId="desktop-navbar-active"
                      className="
                          absolute
                          inset-0

                          rounded-full

                          bg-white
                        "
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`
                    relative
                    z-10

                    transition-colors
                    duration-300

                    ${isActive ? "text-black" : "text-white/50 hover:text-white"}
                  `}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={toggleMenu}
          className="rounded-full md:hidden bg-linear-to-r from-violet-600 via-purple-500 to-cyan-400 p-px shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] cursor-pointer"
        >
          <span className="flex items-center justify-center rounded-full bg-black p-2">
            <FiMenu className="text-white" />
          </span>
        </button>
      </motion.nav>

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
            <motion.div className="flex items-center justify-between w-full h-16 pr-4 pl-1 z-1000">
              <Image
                src={NovaLogo}
                alt="Logo"
                width={100}
                height={100}
                className="cursor-pointer"
              />
              <button
                onClick={toggleMenu}
                className="rounded-full bg-linear-to-r
                   from-violet-600/50
                   via-purple-500
                   to-purple-400/50 
                     p-px shadow-[0_0_30px_rgba(168,85,247,0.25)] 
                     transition-all 
                     hover:scale-110 
                     hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] 
                     cursor-pointer"
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
                className="text-white text-[1.5rem] font-light w-2/3 h-1/2 flex mt-5 flex-col justify-center gap-8 px-4 z-1000"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      className="
                          group
                          relative
                          w-fit
                          cursor-pointer
                          flex
                          items-center
                          gap-2
                        "
                    >
                      <motion.button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        whileHover="hover"
                        className="
                            group
                            relative
                            flex
                            items-center
                            gap-2
                            cursor-pointer
                            text-white
                          "
                      >
                        {/* purple glow */}

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

                        {/* number */}

                        <span
                          className={`
                                relative
                                z-10

                                text-sm
                                font-medium

                                translate-y-0.5

                                transition-all
                                duration-200

                                ${
                                  isActive
                                    ? "text-purple-400 mr-5"
                                    : "text-purple-500 group-hover:mr-5"
                                }
                              `}
                        >
                          {item.number}
                        </span>

                        {/* label */}

                        <span
                          className="
                              relative
                              z-10
                            "
                        >
                          {item.label}
                        </span>

                        {/* arrow */}

                        <FiArrowUpRight
                          className={`
                              relative
                              z-10
                              text-purple-500
                              text-base
                              w-5
                              h-5
                              translate-y-0.5
                              ml-4
                              transition-all
                              duration-200
                              ${
                                isActive
                                  ? "scale-100 opacity-100"
                                  : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                              }
                            `}
                        />

                        {/* active / hover line */}

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
                          animate={
                            isActive
                              ? {
                                  opacity: 1,
                                  scaleX: 1,
                                }
                              : {
                                  opacity: 0,
                                  scaleX: 0.5,
                                }
                          }
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
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        />
                      </motion.button>
                    </motion.li>
                  );
                })}
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
                className="text-white flex items-center justify-center gap-4 w-[90%] px-4 py-2 mx-auto bg-black/70 backdrop:backdrop-blur-md rounded-xl mt-8 cursor-pointer"
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

              <div className="text-white flex items-center my-5">
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
    </>
  );
};

export default Navbar;
