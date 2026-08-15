import { Particle } from "./Particle";
import { ShapeGenerator } from "./ShapeGenerator";
import { Physics } from "./Physics";
import { Mouse } from "./Cursor";
import { ConnectionSystem } from "./ConnectionSystem";

export class ParticleSystem {
  private particles: Particle[] = [];

  private shapeGenerator: ShapeGenerator;
  private physics: Physics;
  private connectionSystem: ConnectionSystem;

  constructor(
    private width: number,
    private height: number,
    private amount: number,
    private mouse: Mouse,
  ) {
    this.shapeGenerator = new ShapeGenerator(width, height);

    this.physics = new Physics();

    this.connectionSystem = new ConnectionSystem();

    this.createParticles();
  }

  private createParticles(): void {
    const points = this.shapeGenerator.generateConstellation(this.amount);

    for (const point of points) {
      const depth = Math.random();

      this.particles.push(
        new Particle(
          point.id,
          point.x,
          point.y,
          depth,
          point.type,
          point.connections,
        ),
      );
    }
  }

  public update(): void {
    for (const particle of this.particles) {
      this.physics.update(particle, this.mouse);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.connectionSystem.draw(ctx, this.particles);

    for (const particle of this.particles) {
      particle.draw(ctx);
    }
  }

  public getParticles(): Particle[] {
    return this.particles;
  }
}
