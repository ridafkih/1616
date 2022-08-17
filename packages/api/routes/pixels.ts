import { method, route } from "18h";
import { generateImage } from "packages/api/utils/image-generation";
import {
  pixelRequestSchema,
  pixelResponseSchema,
} from "packages/api/models/pixel-requests";
import { flipPixels } from "../modules/pixel-map";

export default route({
  post: method({
    schema: {
      request: pixelRequestSchema,
      response: pixelResponseSchema,
    },
    accepts: ["json"],
    async handler(context) {
      const { pixels } = context.request.body;
      const pixelMap = flipPixels(...pixels);
      const frames = await generateImage(pixelMap);

      return {
        status: 200,
        body: { frames },
      };
    },
  }),
});
