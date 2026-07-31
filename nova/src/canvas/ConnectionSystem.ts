import { Particle } from "./Particle";

export class ConnectionSystem {
  constructor(private maxDistance = 120) {}

  public draw(ctx: CanvasRenderingContext2D, particles: Particle[]): void {
    const particleMap = new Map<number, Particle>();

    for (const particle of particles) {
      particleMap.set(particle.id, particle);
    }

    for (const particle of particles) {
      if (particle.type === "ambient") continue;

      for (const connectionId of particle.connections) {
        // Prevent drawing twice
        if (particle.id > connectionId) continue;

        const target = particleMap.get(connectionId);

        if (!target) continue;

        this.drawConnection(ctx, particle, target);
      }
    }
  }

  private drawConnection(
    ctx: CanvasRenderingContext2D,
    a: Particle,
    b: Particle,
  ): void {
    const dx = b.x - a.x;
    const dy = b.y - a.y;

    const distance = Math.hypot(dx, dy);

    if (distance > this.maxDistance) return;

    const opacity = 1 - distance / this.maxDistance;

    const depth = (a.depth + b.depth) * 0.5;

    ctx.save();

    ctx.beginPath();

    ctx.moveTo(a.x, a.y);

    ctx.lineTo(b.x, b.y);

    ctx.lineWidth = 0.4 + depth * 0.8;

    ctx.strokeStyle = `rgba(192,132,252,${opacity * 0.55})`;

    ctx.shadowBlur = 3 + depth * 6;

    ctx.shadowColor = "#C084FC";

    ctx.stroke();

    ctx.restore();
  }
}
