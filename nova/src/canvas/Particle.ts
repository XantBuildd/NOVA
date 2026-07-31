export type ParticleType = "main" | "branch" | "ambient";

export class Particle {
  // ---------- Identity ----------
  public id: number;
  public type: ParticleType;

  // ---------- Connections ----------
  public connections: number[];

  // ---------- Home Position ----------
  public homeX: number;
  public homeY: number;

  // ---------- Current Position ----------
  public x: number;
  public y: number;

  // ---------- Velocity ----------
  public velocityX: number;
  public velocityY: number;

  // ---------- Depth ----------
  public depth: number;

  // ---------- Appearance ----------
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

    //different by type

    switch (type) {
      case "main":
        this.radius = 2 + depth * 3;
        this.glow = 12 + depth * 18;
        this.brightness = 0.9;
        this.color = "#C084FC";
        break;

      case "branch":
        this.radius = 1.6 + depth * 2;
        this.glow = 8 + depth * 12;
        this.brightness = 0.7;
        this.color = "#C084FC";
        break;

      case "ambient":
        this.radius = 0.6 + depth;
        this.glow = 2 + depth * 4;
        this.brightness = 0.35;
        this.color = "#A855F7";
        break;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.globalAlpha = this.brightness;

    ctx.shadowBlur = this.glow;
    ctx.shadowColor = this.color;

    ctx.beginPath();

    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = this.color;

    ctx.fill();

    ctx.restore();
  }
}
