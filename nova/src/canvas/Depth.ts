export class Depth {
  public getRadius(baseRadius: number, z: number): number {
    return baseRadius * (0.4 + z);
  }

  public getAlpha(brightness: number, z: number): number {
    return brightness * (0.25 + z * 0.75);
  }

  public getGlow(radius: number, z: number): number {
    return radius * (8 + z * 12);
  }

  public getLineWidth(z1: number, z2: number): number {
    return 0.5 + (z1 + z2) / 2;
  }

  public getConnectionOpacity(
    distance: number,
    maxDistance: number,
    z1: number,
    z2: number,
  ): number {
    const depth = (z1 + z2) * 0.5;

    return (1 - distance / maxDistance) * depth;
  }
}
