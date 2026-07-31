export interface Point {
  id: number;

  x: number;
  y: number;

  connections: number[];

  type: "main" | "branch" | "ambient";
}

export class ShapeGenerator {
  constructor(
    private width: number,
    private height: number,
    private nextId = 0,
  ) {}

  public generateConstellation(amount: number): Point[] {
    const points: Point[] = [];

    points.push(...this.generateMainBranch(amount * 0.55));

    points.push(...this.generateSideBranches(points));

    points.push(...this.generateAmbientParticles(80));

    return points;
  }

  /**
   * Rama principal
   */
  private generateMainBranch(amount: number): Point[] {
    const points: Point[] = [];

    let x = this.width * 0.88;
    let y = this.height * 0.08;

    for (let i = 0; i < amount; i++) {
      x -= this.width * 0.025;
      y += this.height * 0.055;

      x += (Math.random() - 0.5) * 30;
      y += (Math.random() - 0.5) * 25;

      if (this.insideForbiddenArea(x, y)) {
        continue;
      }

      const point: Point = {
        id: this.nextId++,
        x,
        y,
        type: "main",
        connections: [],
      };

      const previous = points[points.length - 1];

      if (previous) {
        previous.connections.push(point.id);

        point.connections.push(previous.id);
      }

      points.push(point);

      points.push({
        id: this.nextId++,
        x,
        y,
        type: "main",
        connections: [],
      });
    }

    return points;
  }

  /**
   * Pequeñas ramas
   */
  private generateSideBranches(main: Point[]): Point[] {
    const branches: Point[] = [];

    for (const point of main) {
      if (Math.random() < 0.35) {
        const amount = 2 + Math.floor(Math.random() * 4);

        const angle = Math.random() * Math.PI * 2;

        let previous = point;

        for (let i = 1; i <= amount; i++) {
          const distance = i * (20 + Math.random() * 12);

          const x = previous.x + Math.cos(angle) * distance;

          const y = previous.y + Math.sin(angle) * distance;

          if (this.insideForbiddenArea(x, y)) continue;

          const branch: Point = {
            id: this.nextId++,

            x,

            y,

            type: "branch",

            connections: [],
          };

          previous.connections.push(branch.id);

          branch.connections.push(previous.id);

          branches.push(branch);

          previous = branch;
        }
      }
    }

    return branches;
  }

  /**
   * Partículas de ambiente
   */
  private generateAmbientParticles(amount: number): Point[] {
    const particles: Point[] = [];

    while (particles.length < amount) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;

      if (this.insideForbiddenArea(x, y)) {
        continue;
      }

      particles.push({
        id: this.nextId++,
        x,
        y,
        type: "ambient",
        connections: [],
      });
    }

    return particles;
  }

  /**
   * Zona donde no queremos partículas
   */
  private insideForbiddenArea(x: number, y: number): boolean {
    const centerX = this.width * 0.28;
    const centerY = this.height * 0.52;

    const radiusX = this.width * 0.22;
    const radiusY = this.height * 0.34;

    const dx = x - centerX;
    const dy = y - centerY;

    return (
      (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1
    );
  }
}
