import { Mouse } from "./Cursor";
import { ParticleSystem } from "./ParticleSystem";
import { Renderer } from "./Renderer";

export class Engine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private mouse: Mouse;
  private particleSystem: ParticleSystem;
  private renderer: Renderer;

  private animationFrameId: number | null = null;

  private isVisible = true;
  private dpr = 1;

  private width = 0;
  private height = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.ctx = canvas.getContext("2d")!;

    this.resize();

    this.mouse = new Mouse(canvas);

    const isMobile = window.innerWidth < 768;

    const particleAmount = isMobile ? 60 : 300;

    this.particleSystem = new ParticleSystem(
      this.width,
      this.height,
      particleAmount,
      this.mouse,
      isMobile,
    );

    this.renderer = new Renderer();

    window.addEventListener("resize", this.resize);
  }

  public start(): void {
    if (this.animationFrameId !== null) {
      return;
    }

    if (!this.isVisible) {
      return;
    }

    this.loop();
  }

  private loop = (): void => {
    if (!this.isVisible) {
      this.animationFrameId = null;
      return;
    }

    this.update();
    this.render();

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update(): void {
    this.particleSystem.update();
  }

  private render(): void {
    this.renderer.render(this.ctx, this.canvas, this.particleSystem);
  }

  private resize = (): void => {
    const rect = this.canvas.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;

    const isMobile = window.innerWidth < 768;

    this.dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);

    this.canvas.width = this.width * this.dpr;

    this.canvas.height = this.height * this.dpr;

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  };

  public setVisibility(visible: boolean): void {
    this.isVisible = visible;

    if (visible) {
      this.start();
    } else {
      this.stopAnimation();
    }
  }

  private stopAnimation(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);

      this.animationFrameId = null;
    }
  }

  public stop(): void {
    this.stopAnimation();

    window.removeEventListener("resize", this.resize);

    this.mouse.destroy();
  }
}
