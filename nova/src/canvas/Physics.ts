import { Particle } from "./Particle";
import { Mouse } from "./Cursor";

export class Physics {
  update(particle: Particle, mouse: Mouse) {
    this.spring(particle);

    this.mouseRepulsion(particle, mouse);

    this.applyVelocity(particle);
  }

  private spring(particle: Particle) {
    const dx = particle.homeX - particle.x;

    const dy = particle.homeY - particle.y;

    const springStrength = 0.02;

    particle.velocityX += dx * springStrength;
    particle.velocityX *= 0.92;

    particle.velocityY += dy * springStrength;
    particle.velocityY *= 0.92;
  }

  private mouseRepulsion(particle: Particle, mouse: Mouse) {
    if (!mouse.active) return;

    const dx = particle.x - mouse.x;
    const dy = particle.y - mouse.y;

    const distance = Math.hypot(dx, dy);

    const radius = mouse.radius;

    if (distance === 0 || distance > radius) return;

    const force = (radius - distance) / radius;

    const nx = dx / distance;
    const ny = dy / distance;

    const strength = 10;

    particle.velocityX += nx * force * strength;
    particle.velocityY += ny * force * strength;
  }

  private applyVelocity(particle: Particle) {
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
  }
}
