import { validation } from "18h";

export const pixelRequestSchema = validation.object({
  pixels: validation.array(validation.number()).length(16 * 16),
});

export type PixelRequestSchema = validation.infer<typeof pixelRequestSchema>;

export const pixelResponseSchema = validation.object({
  frames: validation.array(validation.string()),
});

export type PixelResponseSchema = validation.infer<typeof pixelResponseSchema>;
