"use client";
import { useRef, useEffect } from "react";
import { Engine } from "@/canvas/Engine";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      className="absolute inset-0 w-full h-[calc(100vh-3rem)] mt-16 z-100"
    ></canvas>
  );
};

export default Canvas;
