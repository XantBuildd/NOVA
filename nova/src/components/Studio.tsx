"use client";

import { TbPointFilled } from "react-icons/tb";
import { Easing, motion, Variants } from "framer-motion";

import Parallax from "./Parallax";
import ProjectCard from "./ProjectCard";
import Nova from "@/assets/NovaLogo.png";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

const projectReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const Studio = () => {
  return (
    <section
      className="
        relative
        w-full
        min-h-screen
        overflow-hidden
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        xl:px-12
      "
    >
      {/* Section header */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.5,
        }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {/* 02 STUDIO */}

        <motion.article
          variants={reveal}
          className="
            relative
            z-20
            flex
            items-center
            gap-4
            pt-4
            text-sm
            text-purple-500/80
          "
        >
          <div className="flex items-center">
            <TbPointFilled className="text-sm text-purple-400" />
            <span>02</span>
          </div>

          <h3 className="tracking-wide">STUDIO</h3>
        </motion.article>

        {/* title */}

        <motion.article
          variants={reveal}
          className="
            relative
            z-30
            mt-4
            max-w-225
          "
        >
          <h2
            className="
              mt-4
              text-[1.6rem]
              leading-[1.15]
              tracking-[-0.03em]
              text-white/80

              sm:text-3xl

              md:text-5xl

              lg:text-6xl

              xl:text-7xl
            "
          >
            The Studio
            <br />
            where ideas
            <br />
            become <span className="italic text-purple-500/80">impact</span>.
          </h2>
        </motion.article>

        {/* Description */}

        <motion.article
          variants={reveal}
          className="
            relative
            z-30
            mt-4
            max-w-90

            sm:max-w-105

            md:max-w-125
          "
        >
          <p
            className="
              text-[12px]
              leading-[1.6]
              tracking-[-0.01em]
              text-white/60

              sm:text-sm

              md:text-base
            "
          >
            We design, build and elevate digital
            <br className="hidden sm:block" />
            experiences that connect brands
            <br className="hidden sm:block" />
            with people.
          </p>
        </motion.article>
      </motion.div>

      {/* Parallax */}

      <motion.div
        className="
          absolute
          inset-0
          z-10
          mt-12
          w-full

          sm:mt-16

          md:mt-20

          lg:mt-24
        "
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.94,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1.1,
          ease: smoothEase,
        }}
      >
        <Parallax />
      </motion.div>

      {/* Projects */}

      <motion.article
        className="
          relative
          z-30
          mt-20
          mb-10
          flex
          w-full
          flex-col
          gap-4

          sm:mt-24
          sm:gap-5

          md:mt-28
          md:gap-6

          lg:mt-32
          lg:gap-7
        "
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.08,
        }}
        variants={{
          hidden: {},

          visible: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
      >
        <motion.div variants={projectReveal}>
          <ProjectCard
            title="Project 1"
            description="Lorem ipsum dolor sit amet"
            image={Nova}
            number="01"
          />
        </motion.div>

        <motion.div variants={projectReveal}>
          <ProjectCard
            title="Project 2"
            description="Lorem ipsum dolor sit amet"
            image={Nova}
            number="02"
          />
        </motion.div>

        <motion.div variants={projectReveal}>
          <ProjectCard
            title="Project 3"
            description="Lorem ipsum dolor sit amet"
            image={Nova}
            number="03"
          />
        </motion.div>
      </motion.article>
    </section>
  );
};

export default Studio;
