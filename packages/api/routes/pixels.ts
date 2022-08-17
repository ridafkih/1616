import { method, route } from "18h";
import { pixelRequestSchema, pixelResponseSchema } from "models/pixel-requests";
import { flipPixels } from "modules/pixel-map";
import { makeUpdateScreenRequest } from "services/raspberry-pi";
import { generateImage } from "utils/image-generation";

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
      await makeUpdateScreenRequest(frames);

      return {
        status: 200,
        body: { frames },
      };
    },
  }),
});
