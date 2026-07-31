import { Engine } from "./Engine";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const engine = new Engine(canvas);

engine.start();
