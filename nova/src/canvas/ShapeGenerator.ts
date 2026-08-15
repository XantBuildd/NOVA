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

    /*
     * La estructura principal ocupa aproximadamente
     * la mitad de las partículas.
     */
    const mainAmount = Math.floor(amount * 0.6);

    const main = this.generateMainBranch(mainAmount);

    points.push(...main);

    /*
     * Ramas secundarias alrededor de la estructura.
     */
    points.push(...this.generateSideBranches(main));

    /*
     * Partículas pequeñas alrededor.
     */
    points.push(...this.generateAmbientParticles(Math.floor(amount * 0.35)));

    return points;
  }

  /**
   * Rama principal.
   *
   * Mantiene la idea original:
   *
   *       •
   *        •
   *         •
   *          •
   *           •
   *            •
   *
   * Pero con pequeñas variaciones para que
   * cada generación sea diferente.
   */
  private generateMainBranch(amount: number): Point[] {
    const points: Point[] = [];

    let x = this.width * 0.88;
    let y = this.height * 0.08;

    for (let i = 0; i < amount; i++) {
      /*
       * Movimiento principal controlado.
       *
       * No dejamos que X se vaya demasiado rápido
       * hacia la izquierda.
       */
      x -= this.width * 0.022;

      y += this.height * 0.048;

      /*
       * Variación orgánica.
       */
      const offsetX = (Math.random() - 0.5) * 45;

      const offsetY = (Math.random() - 0.5) * 35;

      const particleX = x + offsetX;
      const particleY = y + offsetY;

      /*
       * Evitamos partículas fuera de pantalla.
       */
      if (
        particleX < 20 ||
        particleX > this.width - 20 ||
        particleY < 20 ||
        particleY > this.height - 20
      ) {
        continue;
      }

      if (this.insideForbiddenArea(particleX, particleY)) {
        continue;
      }

      const point: Point = {
        id: this.nextId++,
        x: particleX,
        y: particleY,
        type: "main",
        connections: [],
      };

      /*
       * Conectar con el punto anterior.
       */
      const previous = points[points.length - 1];

      if (previous) {
        previous.connections.push(point.id);

        point.connections.push(previous.id);
      }

      points.push(point);

      /*
       * Algunas veces añadimos un segundo
       * punto cerca de la trayectoria.
       *
       * Esto genera pequeños grupos.
       */
      if (Math.random() < 0.35) {
        const secondaryX = particleX + (Math.random() - 0.5) * 35;

        const secondaryY = particleY + (Math.random() - 0.5) * 35;

        if (
          secondaryX > 20 &&
          secondaryX < this.width - 20 &&
          secondaryY > 20 &&
          secondaryY < this.height - 20 &&
          !this.insideForbiddenArea(secondaryX, secondaryY)
        ) {
          const secondary: Point = {
            id: this.nextId++,
            x: secondaryX,
            y: secondaryY,
            type: "main",
            connections: [],
          };

          point.connections.push(secondary.id);

          secondary.connections.push(point.id);

          points.push(secondary);
        }
      }
    }

    return points;
  }

  /**
   * Ramas secundarias.
   */
  private generateSideBranches(main: Point[]): Point[] {
    const branches: Point[] = [];

    for (const point of main) {
      /*
       * No todas las partículas generan ramas.
       */
      if (Math.random() > 0.32) {
        continue;
      }

      /*
       * Ramas de 2 a 5 partículas.
       */
      const amount = 2 + Math.floor(Math.random() * 4);

      /*
       * En lugar de una dirección totalmente
       * aleatoria, usamos principalmente
       * direcciones diagonales.
       */
      let angle;

      if (Math.random() < 0.5) {
        /*
         * Rama hacia arriba.
         */
        angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      } else {
        /*
         * Rama hacia abajo/lateral.
         */
        angle = Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      }

      let previous = point;

      for (let i = 0; i < amount; i++) {
        /*
         * Curvatura pequeña.
         */
        angle += (Math.random() - 0.5) * 0.3;

        const distance = 18 + Math.random() * 14;

        const x = previous.x + Math.cos(angle) * distance;

        const y = previous.y + Math.sin(angle) * distance;

        /*
         * Evitar salir del canvas.
         */
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

  /**
   * Partículas ambientales.
   */
  private generateAmbientParticles(amount: number): Point[] {
    const particles: Point[] = [];

    let attempts = 0;

    while (particles.length < amount && attempts < amount * 20) {
      attempts++;

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
   * Zona central reservada.
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
