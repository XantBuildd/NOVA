"use client";

import { useEffect, useRef } from "react";
import { Engine } from "@/canvas/Engine";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const engine = new Engine(canvas);

    engine.start();

    return () => {
      engine.stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="
        absolute
        inset-0
        h-full
        w-full
      "
    />
  );
};

export default Canvas;
