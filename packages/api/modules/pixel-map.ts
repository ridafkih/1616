const pixels: number[] = [];

export const flipPixels = (...flippedPixels: number[]) => {
  for (const pixel of flippedPixels) {
    if (pixel < 0 || pixel >= 256) continue;
    const position = pixels.indexOf(pixel);
    if (position === -1) pixels.push(pixel);
    else pixels.splice(position, 1);
  }

  return pixels;
};
