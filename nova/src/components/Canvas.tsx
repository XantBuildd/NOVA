"use client";

import { useEffect, useRef } from "react";
import { Engine } from "@/canvas/Engine";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const engine = new Engine(canvas);

    engineRef.current = engine;

    const observer = new IntersectionObserver(
      ([entry]) => {
        engine.setVisibility(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      },
    );

    observer.observe(canvas);

    engine.start();

    return () => {
      observer.disconnect();

      engine.stop();

      engineRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
