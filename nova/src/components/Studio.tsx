import { TbPointFilled } from "react-icons/tb";
import Parallax from "./Parallax";
import ProjectCard from "./ProjectCard";
import Nova from "@/assets/NovaLogo.png";

const Studio = () => {
  return (
    <section className="flex flex-col w-full h-full px-4 relative overflow-hidden">
      {/* 02 STUDIO */}
      <article className="text-sm text-purple-500/80 flex items-center gap-4 mt-4 z-10">
        <div className="flex items-center">
          <TbPointFilled className="text-sm text-purple-400" />
          02
        </div>
        <h3>STUDIO</h3>
      </article>

      {/* title and description */}

      <article className="mb-10 z-30">
        <h2 className="text-[1.6rem] text-white/80 font-normal mt-4">
          The Studio <br /> where ideas <br /> become{" "}
          <span className="italic text-purple-500/80">impact</span>.
        </h2>

        <p className="text-white/60 mt-4 text-[12px]">
          We design, build and elevate digital <br /> experiences that connect
          brands <br /> with people.
        </p>
      </article>

      {/* studio image parallax */}
      <Parallax />

      {/* Studio projects */}
      <article className="flex flex-col gap-3 w-full mt-30 text-amber-50 z-30 mb-10">
        <ProjectCard
          title="Project 1"
          description="Lorem ipsum dolor sit amet"
          image={Nova}
          number="01"
        />
        <ProjectCard
          title="Project 2"
          description="Lorem ipsum dolor sit amet"
          image={Nova}
          number="02"
        />
        <ProjectCard
          title="Project 3"
          description="Lorem ipsum dolor sit amet"
          image={Nova}
          number="03"
        />
      </article>
    </section>
  );
};

export default Studio;
