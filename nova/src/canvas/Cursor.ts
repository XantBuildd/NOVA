export class Mouse {
  public x: number;
  public y: number;

  public previousX: number;
  public previousY: number;

  public velocityX: number;
  public velocityY: number;

  public radius: number;

  public active: boolean;

  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, radius: number = 120) {
    this.canvas = canvas;

    this.x = 0;
    this.y = 0;

    this.previousX = 0;
    this.previousY = 0;

    this.velocityX = 0;
    this.velocityY = 0;

    this.radius = radius;

    this.active = false;

    window.addEventListener("mousemove", this.handleMouseMove);
  }

  private handleMouseMove = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;

    const y = event.clientY - rect.top;

    const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

    this.active = inside;

    if (!inside) {
      return;
    }

    this.previousX = this.x;
    this.previousY = this.y;

    this.x = x;
    this.y = y;

    this.velocityX = this.x - this.previousX;

    this.velocityY = this.y - this.previousY;
  };

  public destroy() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  }
}
