import { createCanvas } from "canvas";
import { DisplayAnimation, TimeboxEvo } from "node-divoom-timebox-evo";
import { JimpArray } from "node-divoom-timebox-evo/dist/drawing/jimp_overloads";

type PixelMap = number[];

const evo = new TimeboxEvo();

const processJimpBuffer = (jimpArray: JimpArray) => {
  return jimpArray
    .asBinaryBuffer()
    .map((binaryBuffer) => binaryBuffer.toString("base64"));
};

export const generateImage = async (pixels: PixelMap) => {
  const request = evo.createRequest("animation") as DisplayAnimation;
  const canvas = createCanvas(16, 16);
  const context = canvas.getContext("2d");
  context.fillStyle = "#000000";
  context.fillRect(0, 0, 16, 16);
  context.fillStyle = "#FFFFFF";

  for (const pixel of pixels) {
    const x = pixel % 16;
    const y = Math.floor(pixel / 16);
    context.fillRect(x, y, 1, 1);
  }

  const buffer = canvas.toBuffer("image/png");
  const processedBuffer = await request.read(buffer).then(processJimpBuffer);

  return processedBuffer;
};
