import { validation } from "18h";

export const frameRequestModel = validation.object({
  frames: validation.array(validation.string()),
});

export type FrameRequestModel = validation.infer<typeof frameRequestModel>;

export const frameResponseModel = validation.boolean();

export type FrameResponseModel = validation.infer<typeof frameResponseModel>;