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

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.ctx = canvas.getContext("2d")!;

    this.resize();

    this.mouse = new Mouse(canvas);

    this.particleSystem = new ParticleSystem(
      this.canvas.width,
      this.canvas.height,
      180,
      this.mouse,
    );

    this.renderer = new Renderer();

    window.addEventListener("resize", this.resize);
  }

  public start(): void {
    if (this.animationFrameId !== null) {
      return;
    }

    this.loop();
  }

  private loop = (): void => {
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

    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  };

  public stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);

      this.animationFrameId = null;
    }

    window.removeEventListener("resize", this.resize);

    this.mouse.destroy();
  }
}
