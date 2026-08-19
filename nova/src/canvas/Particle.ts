export type ParticleType = "main" | "branch" | "ambient";

export class Particle {
  public id: number;
  public type: ParticleType;

  public connections: number[];

  public homeX: number;
  public homeY: number;

  public x: number;
  public y: number;

  public velocityX: number;
  public velocityY: number;

  public depth: number;

  public radius: number;
  public brightness: number;
  public glow: number;
  public color: string;

  constructor(
    id: number,
    x: number,
    y: number,
    depth: number,
    type: ParticleType,
    connections: number[],
    private isMobile: boolean,
  ) {
    this.id = id;
    this.type = type;

    this.connections = [...connections];

    this.homeX = x;
    this.homeY = y;

    this.x = x;
    this.y = y;

    this.velocityX = 0;
    this.velocityY = 0;

    this.depth = depth;

    switch (type) {
      case "main":
        this.radius = 2 + depth * 3;
        this.glow = isMobile ? 6 + depth * 8 : 12 + depth * 18;
        this.brightness = 0.9;
        this.color = "#C084FC";
        break;

      case "branch":
        this.radius = 1.6 + depth * 2;
        this.glow = isMobile ? 4 + depth * 6 : 8 + depth * 12;
        this.brightness = 0.7;
        this.color = "#C084FC";
        break;

      case "ambient":
        this.radius = 0.6 + depth;
        this.glow = isMobile ? 1 + depth * 2 : 2 + depth * 4;
        this.brightness = 0.35;
        this.color = "#A855F7";
        break;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = this.brightness;

    if (this.type === "ambient") {
      ctx.beginPath();

      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

      ctx.fillStyle = this.color;

      ctx.fill();

      return;
    }

    if (this.type === "branch") {
      ctx.beginPath();

      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

      ctx.fillStyle = this.color;

      ctx.fill();

      return;
    }

    ctx.save();

    ctx.shadowBlur = this.glow;
    ctx.shadowColor = this.color;

    ctx.beginPath();

    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = this.color;

    ctx.fill();

    ctx.restore();
  }
}
