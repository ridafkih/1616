import { validation } from "18h";

export const pixelRequestSchema = validation.object({
  pixels: validation.array(validation.number()),
});

export type PixelRequestSchema = validation.infer<typeof pixelRequestSchema>;

export const pixelResponseSchema = validation.object({
  frames: validation.array(validation.string()),
  pixels: validation.array(validation.number()),
});

export type PixelResponseSchema = validation.infer<typeof pixelResponseSchema>;
