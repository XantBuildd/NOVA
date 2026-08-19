export interface Point {
  id: number;

  x: number;
  y: number;

  connections: number[];

  type: "main" | "branch" | "ambient";
}

export class ShapeGenerator {
  private nextId: number;

  constructor(
    private width: number,
    private height: number,
    nextId = 0,
  ) {
    this.nextId = nextId;
  }

  public generateConstellation(amount: number): Point[] {
    const points: Point[] = [];

    /*
     * --------------------------------------------------
     * PARTICLE DISTRIBUTION
     * --------------------------------------------------
     *
     * Desktop:
     * 180 total
     *
     * Mobile:
     * ~60 total
     *
     * We keep the main structure dominant because it
     * contains the actual constellation shape.
     */

    const mainAmount = Math.floor(amount * 0.76);

    const ambientAmount = Math.floor(amount * 0.14);

    const main = this.generateMainBranch(mainAmount);

    points.push(...main);

    const branches = this.generateSideBranches(main, amount);

    points.push(...branches);

    const ambient = this.generateAmbientParticles(ambientAmount);

    points.push(...ambient);

    return points;
  }

  // ==================================================
  // MAIN CONSTELLATION
  // ==================================================

  private generateMainBranch(amount: number): Point[] {
    const points: Point[] = [];

    /*
     * IMPORTANT:
     *
     * We no longer change the overall geometry
     * dramatically between desktop and mobile.
     *
     * The constellation remains centered around the
     * same visual structure.
     */

    const centerX = this.width * 0.68;

    const centerY = this.height * 0.5;

    /*
     * Responsive radius.
     *
     * We still adapt slightly to the available space,
     * but we don't completely change the shape.
     */

    const baseSize = Math.min(this.width, this.height);

    const radius = baseSize * (this.width < 768 ? 0.5 : 0.38);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    /*
     * Generate orbital points.
     */

    for (let i = 0; i < amount; i++) {
      const normalized = 1 - (i / Math.max(amount - 1, 1)) * 2;

      const ringRadius = Math.sqrt(Math.max(0, 1 - normalized * normalized));

      const angle = goldenAngle * i;

      /*
       * Small organic distortion.
       */

      const distortion =
        1 + Math.sin(i * 0.37) * 0.035 + Math.sin(i * 0.13) * 0.02;

      /*
       * Smaller movement on mobile.
       */

      const organicOffset = this.width < 768 ? 2 : 5;

      let x = centerX + Math.cos(angle) * ringRadius * radius * distortion;

      let y = centerY + normalized * radius * distortion;

      /*
       * Organic movement.
       */

      x += Math.sin(i * 1.73) * organicOffset;

      y += Math.cos(i * 1.37) * organicOffset;

      /*
       * Keep particles inside the canvas.
       */

      if (x < 20 || x > this.width - 20 || y < 20 || y > this.height - 20) {
        continue;
      }

      /*
       * Don't place particles inside the text/logo
       * area.
       */

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

    /*
     * Build the main constellation mesh.
     */

    this.connectOrbitalMesh(points);

    return points;
  }

  // ==================================================
  // CONNECTIONS
  // ==================================================

  private connectOrbitalMesh(points: Point[]): void {
    /*
     * Mobile uses slightly shorter connections.
     *
     * This prevents the constellation from becoming
     * visually too dense when the number of particles
     * is reduced.
     */

    const maxDistance =
      Math.min(this.width, this.height) * (this.width < 768 ? 0.18 : 0.14);

    const maxDistanceSquared = maxDistance * maxDistance;

    const maxConnections = this.width < 768 ? 4 : 5;

    /*
     * Instead of:
     *
     * filter()
     * map()
     * sort()
     *
     * for every particle,
     *
     * we manually maintain the closest
     * candidates.
     */

    for (const point of points) {
      const nearest: {
        point: Point;
        distanceSquared: number;
      }[] = [];

      for (const candidate of points) {
        if (candidate.id === point.id) {
          continue;
        }

        const dx = point.x - candidate.x;

        const dy = point.y - candidate.y;

        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared > maxDistanceSquared) {
          continue;
        }

        nearest.push({
          point: candidate,
          distanceSquared,
        });
      }

      /*
       * Only sort when necessary.
       *
       * Since the number of candidates is
       * relatively small, this is considerably
       * lighter than the previous chain of
       * filter → map → sort.
       */

      nearest.sort((a, b) => a.distanceSquared - b.distanceSquared);

      const closest = nearest.slice(0, maxConnections);

      for (const neighbor of closest) {
        /*
         * Prevent duplicate connections.
         */

        if (!point.connections.includes(neighbor.point.id)) {
          point.connections.push(neighbor.point.id);
        }

        if (!neighbor.point.connections.includes(point.id)) {
          neighbor.point.connections.push(point.id);
        }
      }
    }
  }

  // ==================================================
  // SIDE BRANCHES
  // ==================================================

  private generateSideBranches(main: Point[], totalAmount: number): Point[] {
    const branches: Point[] = [];

    /*
     * Desktop:
     * More branches.
     *
     * Mobile:
     * Fewer branches.
     */

    const branchChance = this.width < 768 ? 0.13 : 0.22;

    /*
     * Prevent branches from consuming too much
     * of the mobile particle budget.
     */

    const maxBranches =
      this.width < 768
        ? Math.floor(totalAmount * 0.12)
        : Math.floor(totalAmount * 0.18);

    for (const point of main) {
      if (branches.length >= maxBranches) {
        break;
      }

      if (Math.random() > branchChance) {
        continue;
      }

      /*
       * Desktop:
       * 1-3 branch segments.
       *
       * Mobile:
       * 1-2 segments.
       */

      const amount =
        this.width < 768
          ? 1 + Math.floor(Math.random() * 2)
          : 1 + Math.floor(Math.random() * 3);

      let angle = Math.random() * Math.PI * 2;

      let previous = point;

      for (let i = 0; i < amount; i++) {
        if (branches.length >= maxBranches) {
          break;
        }

        angle += (Math.random() - 0.5) * 0.8;

        const distance =
          this.width < 768 ? 9 + Math.random() * 9 : 12 + Math.random() * 12;

        const x = previous.x + Math.cos(angle) * distance;

        const y = previous.y + Math.sin(angle) * distance;

        /*
         * Boundaries.
         */

        if (x < 15 || x > this.width - 15 || y < 15 || y > this.height - 15) {
          break;
        }

        /*
         * Forbidden area.
         */

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

        /*
         * Connect branch to previous point.
         */

        previous.connections.push(branch.id);

        branch.connections.push(previous.id);

        branches.push(branch);

        previous = branch;
      }
    }

    return branches;
  }

  // ==================================================
  // AMBIENT PARTICLES
  // ==================================================

  private generateAmbientParticles(amount: number): Point[] {
    const particles: Point[] = [];

    /*
     * Keep the same visual center as the main
     * constellation.
     */

    const centerX = this.width * 0.68;

    const centerY = this.height * 0.5;

    const radius =
      Math.min(this.width, this.height) * (this.width < 768 ? 0.58 : 0.48);

    let attempts = 0;

    const maxAttempts = Math.max(amount * 20, 30);

    while (particles.length < amount && attempts < maxAttempts) {
      attempts++;

      const angle = Math.random() * Math.PI * 2;

      const distance = radius * (0.9 + Math.random() * 0.35);

      const x = centerX + Math.cos(angle) * distance;

      const y = centerY + Math.sin(angle) * distance;

      /*
       * Canvas bounds.
       */

      if (x < 10 || x > this.width - 10 || y < 10 || y > this.height - 10) {
        continue;
      }

      /*
       * Forbidden area.
       */

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

  // ==================================================
  // FORBIDDEN AREA
  // ==================================================

  private insideForbiddenArea(x: number, y: number): boolean {
    /*
     * Keep the forbidden area aligned with
     * the NØVA text/logo area.
     */

    const centerX = this.width * 0.28;

    const centerY = this.height * 0.52;

    const radiusX = this.width * (this.width < 768 ? 0.18 : 0.22);

    const radiusY = this.height * (this.width < 768 ? 0.24 : 0.34);

    const dx = x - centerX;

    const dy = y - centerY;

    return (
      (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1
    );
  }
}
