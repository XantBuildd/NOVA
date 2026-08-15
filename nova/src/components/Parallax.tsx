"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import Background from "@/assets/Studio-section-background.png";
import Rock from "@/assets/Studio-rock.png";
import RockLeft from "@/assets/Studio-rock-left.png";

const Parallax = () => {
  /*
   * --------------------------------
   * MOUSE
   * --------------------------------
   */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /*
   * --------------------------------
   * SUAVIZADO
   * --------------------------------
   */

  const smoothX = useSpring(mouseX, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  /*
   * --------------------------------
   * TILT
   * --------------------------------
   */

  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);

  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);

  /*
   * --------------------------------
   * ROCK RIGHT
   * --------------------------------
   */

  const rockX = useTransform(smoothX, [-1, 1], [-25, 25]);

  const rockY = useTransform(smoothY, [-1, 1], [-15, 15]);

  /*
   * --------------------------------
   * ROCK LEFT
   * --------------------------------
   */

  const rockLeftX = useTransform(smoothX, [-1, 1], [-12, 12]);

  const rockLeftY = useTransform(smoothY, [-1, 1], [-8, 8]);

  /*
   * --------------------------------
   * MOUSE HANDLER
   * --------------------------------
   */

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;

    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="w-full h-full overflow-hidden -z-1"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0">
        <span className="absolute top-0 left-0 w-full h-16 bg-linear-to-b from-black to-transparent blur-[10px] -z-1" />

        <Image
          src={Background}
          className="object-cover"
          alt="parallax background"
          fill
          priority
        />
      </div>

      {/* ROCK RIGHT */}

      <motion.div
        className="absolute top-[60%] right-[2%] z-20"
        style={{
          x: rockX,
          y: rockY,
          rotateX,
          rotateY,
        }}
      >
        <Image
          src={Rock}
          className="object-cover max-w-30 h-auto blur-[2px]"
          alt="rock decoration"
          priority
        />
      </motion.div>

      {/* ROCK LEFT */}

      <motion.div
        className="absolute top-[10%] left-[1%] z-20"
        style={{
          x: rockLeftX,
          y: rockLeftY,
          rotateX,
          rotateY,
        }}
      >
        <Image
          src={RockLeft}
          className="object-cover max-w-30 h-auto blur-[1px]"
          alt="rock decoration"
          priority
        />
      </motion.div>
    </section>
  );
};

export default Parallax;
