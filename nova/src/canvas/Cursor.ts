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

    this.initEvents();
  }

  private initEvents() {
    this.canvas.addEventListener("mousemove", this.handleMouseMove);

    this.canvas.addEventListener("mouseenter", () => {
      this.active = true;
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.active = false;
    });
  }

  private handleMouseMove = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();

    this.previousX = this.x;
    this.previousY = this.y;

    this.x = event.clientX - rect.left;
    this.y = event.clientY - rect.top;

    this.velocityX = this.x - this.previousX;
    this.velocityY = this.y - this.previousY;
  };

  public destroy() {
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
  }
}
