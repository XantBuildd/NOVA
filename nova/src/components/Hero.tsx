import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { TbNorthStar } from "react-icons/tb";
import { TbPointFilled } from "react-icons/tb";
import { Poppins } from "next/font/google";
import Canvas from "@/components/Canvas";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const Hero = () => {
  return (
    <header className="text-white px-4 flex flex-col w-full h-full">
      <Canvas />
      {/* header information title */}
      <div className="flex items-center justify-center w-3/4 border border-purple-600/40 gap-2 p-1 rounded-2xl ">
        <TbPointFilled className="text-sm text-purple-400" />
        <h2 className="text-[10px] text-purple-500/80">
          DIGITAL EXPERIENCES STUDIO
        </h2>
      </div>
      {/* header information */}
      <section>
        <article>
          <h1 className={`${poppins} text-[1.6rem] text-white/80 mt-4`}>
            We design <br /> digital experiences <br /> that{" "}
            <span className="text-purple-400/80 italic">move people</span>.
          </h1>

          {/* line */}
          <span className="block w-12 h-px bg-purple-400/40 mt-4"></span>

          <p className="text-white/60 mt-4 text-[12px]">
            Creating beautiful, functional and <br /> meaningful digital
            products that <br /> connect brands with people.
          </p>

          <button className="cursor-pointer flex items-center bg-transparent relative text-sm gap-2 justify-center border border-purple-400/70 shadow-[0px_0px_8px_#541379] px-4 py-3 rounded-3xl mt-4">
            <span className="absolute z-0 shadow-[0_0_20px_#40105c] bg-[#40105c33] backdrop-blur-xl rounded-3xl w-[90%] h-4 top-0"></span>
            <p className="text-[12px] font-semibold z-10 text-white/80">
              EXPLORE OUR STUDIO
            </p>
            <FiArrowUpRight className="z-10" />
          </button>
        </article>

        <article className="flex w-full mt-10">
          <ul className="flex items-center justify-center">
            <li className="flex flex-col relative items-center justify-center gap-2 px-2">
              {/* <span className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 rounded-full bg-radial from-purple-400/10 to-purple-600/10 shadow-[0_0_40px_#2a0a3d] w-12 h-12"></span> */}
              <h3 className="text-xl text-purple-400">32+</h3>
              <p className="text-[10px] text-white/50">PROJECTS COMPLETED</p>
            </li>

            <span className="w-px h-[70%] border-r border-purple-300/40"></span>

            <li className="flex relative flex-col items-center justify-center gap-2 px-2">
              {/* <span className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 rounded-full bg-radial from-purple-400/10 to-purple-600/10 shadow-[0_0_40px_#2a0a3d] w-12 h-12"></span> */}
              <h3 className="text-xl text-purple-400">100+</h3>
              <p className="text-[10px] text-white/50">HAPPY CLIENTS</p>
            </li>

            <span className="w-px h-[70%] border-r border-purple-300/40"></span>

            <li className="flex relative flex-col items-center justify-center gap-2 px-2">
              {/* <span className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 rounded-full bg-radial from-purple-400/10 to-purple-600/10 shadow-[0_0_40px_#2a0a3d] w-12 h-12"></span> */}
              <h3 className="text-xl text-purple-400">4+</h3>
              <p className="text-[10px] text-white/50">YEARS OF EXPERIENCE</p>
            </li>
          </ul>
        </article>

        {/* our approach button */}

        <article className="flex w-full my-4">
          <button
            className="
    group
    relative
    overflow-hidden
    flex
    items-center
    gap-2
    rounded-2xl
    border
    border-white/10
    bg-white/2
    backdrop-blur-xl
    px-2
    py-2
    transition-all
    duration-500
    hover:border-purple-400/40
    hover:bg-white/4
  "
          >
            {/* Glow */}
            <div
              className="
      absolute
      -left-10
      top-1/2
      h-32
      w-32
      -translate-y-1/2
      rounded-full
      bg-purple-500/20
      blur-3xl
      opacity-0
      transition-all
      duration-700
      group-hover:opacity-100
      group-hover:left-0
    "
            />

            {/* Icon */}
            <div
              className="
      relative
      flex
      h-10
      w-10

      items-center
      justify-center
      rounded-full
      border
      border-purple-400/30
      bg-linear-to-br
      from-purple-500/20
      to-transparent
      shadow-[0_0_35px_rgba(168,85,247,.25)]
      transition-all
      duration-500
      group-hover:scale-110
      group-hover:shadow-[0_0_50px_rgba(168,85,247,.45)]
    "
            >
              <TbNorthStar className="text-xl text-purple-300" />
            </div>

            {/* Text */}
            <div className="relative flex flex-col text-left">
              <span className="text-[10px] tracking-[0.25em] text-purple-400 uppercase">
                OUR APPROACH
              </span>

              <span className="mt-1 text-[10px] text-white/80 leading-relaxed">
                Strategy. Design. Development.
                <br />
                All in one flow.
              </span>
            </div>

            {/* Arrow */}
            <div
              className="
      ml-auto
      flex
      h-8
      w-8
      items-center
      justify-center
      rounded-full
      border
      border-white/10
      bg-white/[0.03]
      transition-all
      duration-500
      group-hover:border-purple-400/40
      group-hover:bg-purple-500/10
      group-hover:translate-x-1
    "
            >
              <FiArrowRight
                className="
        text-white/60
        transition-all
        duration-500
        group-hover:text-purple-300
      "
              />
            </div>
          </button>
        </article>
      </section>
    </header>
  );
};

export default Hero;
