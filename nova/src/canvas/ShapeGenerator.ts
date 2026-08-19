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

    const mainAmount = Math.floor(amount * 0.76);

    const main = this.generateMainBranch(mainAmount);

    points.push(...main);

    const branches = this.generateSideBranches(main);

    points.push(...branches);

    const ambientAmount = Math.floor(amount * 0.14);

    points.push(...this.generateAmbientParticles(ambientAmount));

    return points;
  }

  private generateMainBranch(amount: number): Point[] {
    const points: Point[] = [];

    const isMobile = this.width < 768;

    const centerX = isMobile ? this.width * 0.5 : this.width * 0.68;

    const centerY = this.height * 0.5;

    const radius = isMobile
      ? Math.min(this.width, this.height) * 0.72
      : Math.min(this.width, this.height) * 0.38;

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < amount; i++) {
      const normalized = 1 - (i / Math.max(amount - 1, 1)) * 2;

      const ringRadius = Math.sqrt(Math.max(0, 1 - normalized * normalized));

      const angle = goldenAngle * i;

      const distortion =
        1 + Math.sin(i * 0.37) * 0.035 + Math.sin(i * 0.13) * 0.02;

      const organicOffset = isMobile ? 3 : 5;

      let x = centerX + Math.cos(angle) * ringRadius * radius * distortion;

      let y = centerY + normalized * radius * distortion;

      x += Math.sin(i * 1.73) * organicOffset;

      y += Math.cos(i * 1.37) * organicOffset;

      if (x < 20 || x > this.width - 20 || y < 20 || y > this.height - 20) {
        continue;
      }

      if (this.insideForbiddenArea(x, y)) {
        continue;
      }

      points.push({
        id: this.nextId++,
        x,
        y,
        type: "main",
        connections: [],
      });
    }

    this.connectOrbitalMesh(points);

    return points;
  }

  private connectOrbitalMesh(points: Point[]) {
    const isMobile = this.width < 768;

    const maxDistance =
      Math.min(this.width, this.height) * (isMobile ? 0.2 : 0.14);

    const maxConnections = isMobile ? 6 : 5;

    for (const point of points) {
      const neighbors = points
        .filter((candidate) => candidate.id !== point.id)
        .map((candidate) => {
          const dx = point.x - candidate.x;

          const dy = point.y - candidate.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          return {
            point: candidate,
            distance,
          };
        })
        .filter(({ distance }) => distance < maxDistance)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxConnections);

      for (const neighbor of neighbors) {
        if (!point.connections.includes(neighbor.point.id)) {
          point.connections.push(neighbor.point.id);
        }

        if (!neighbor.point.connections.includes(point.id)) {
          neighbor.point.connections.push(point.id);
        }
      }
    }
  }

  private generateSideBranches(main: Point[]): Point[] {
    const branches: Point[] = [];

    for (const point of main) {
      if (Math.random() > 0.22) {
        continue;
      }

      const amount = 1 + Math.floor(Math.random() * 3);

      let angle = Math.random() * Math.PI * 2;

      let previous = point;

      for (let i = 0; i < amount; i++) {
        angle += (Math.random() - 0.5) * 0.8;

        const distance = 12 + Math.random() * 12;

        const x = previous.x + Math.cos(angle) * distance;

        const y = previous.y + Math.sin(angle) * distance;

        if (x < 15 || x > this.width - 15 || y < 15 || y > this.height - 15) {
          break;
        }

        if (this.insideForbiddenArea(x, y)) {
          break;
        }

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

    return branches;
  }

  private generateAmbientParticles(amount: number): Point[] {
    const particles: Point[] = [];

    const isMobile = this.width < 768;

    const centerX = isMobile ? this.width * 0.5 : this.width * 0.68;

    const centerY = this.height * 0.5;

    const radius = Math.min(this.width, this.height) * (isMobile ? 0.82 : 0.48);

    let attempts = 0;

    while (particles.length < amount && attempts < amount * 30) {
      attempts++;

      const angle = Math.random() * Math.PI * 2;

      const distance = radius * (0.9 + Math.random() * 0.35);

      const x = centerX + Math.cos(angle) * distance;

      const y = centerY + Math.sin(angle) * distance;

      if (x < 10 || x > this.width - 10 || y < 10 || y > this.height - 10) {
        continue;
      }

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

  private insideForbiddenArea(x: number, y: number): boolean {
    const isMobile = this.width < 768;

    const centerX = isMobile ? this.width * 0.5 : this.width * 0.28;

    const centerY = this.height * 0.52;

    const radiusX = this.width * (isMobile ? 0.16 : 0.22);

    const radiusY = this.height * (isMobile ? 0.22 : 0.34);

    const dx = x - centerX;

    const dy = y - centerY;

    return (
      (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1
    );
  }
}
