import { ParticleSystem } from "./ParticleSystem";

export class Renderer {
  public render(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    particleSystem: ParticleSystem,
  ): void {
    this.clear(ctx, canvas);

    this.drawParticles(ctx, particleSystem);
  }

  private clear(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private drawParticles(
    ctx: CanvasRenderingContext2D,
    particleSystem: ParticleSystem,
  ): void {
    particleSystem.draw(ctx);
  }
}
