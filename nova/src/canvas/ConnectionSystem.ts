import { Particle } from "./Particle";

export class ConnectionSystem {
  private particleMap = new Map<number, Particle>();

  constructor(
    private maxDistance = 120,
    private isMobile = false,
  ) {}

  public setParticles(particles: Particle[]): void {
    this.particleMap.clear();

    for (const particle of particles) {
      this.particleMap.set(particle.id, particle);
    }
  }

  public draw(ctx: CanvasRenderingContext2D, particles: Particle[]): void {
    if (this.particleMap.size === 0) {
      this.setParticles(particles);
    }

    for (const particle of particles) {
      if (particle.type === "ambient") {
        continue;
      }

      for (const connectionId of particle.connections) {
        if (particle.id > connectionId) {
          continue;
        }

        const target = this.particleMap.get(connectionId);

        if (!target) {
          continue;
        }

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

    const distanceSquared = dx * dx + dy * dy;

    const maxDistanceSquared = this.maxDistance * this.maxDistance;

    if (distanceSquared > maxDistanceSquared) {
      return;
    }

    const distance = Math.sqrt(distanceSquared);

    const opacity = 1 - distance / this.maxDistance;

    const depth = (a.depth + b.depth) * 0.5;

    ctx.beginPath();

    ctx.moveTo(a.x, a.y);

    ctx.lineTo(b.x, b.y);

    ctx.lineWidth = 0.4 + depth * 0.8;

    ctx.strokeStyle = `rgba(192,132,252,${opacity * 0.55})`;

    ctx.stroke();
  }
}
