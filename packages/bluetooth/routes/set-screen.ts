import { method, route } from "18h";
import { frameRequestModel, frameResponseModel } from "models/frame-requests";
import { sendAnimation } from "modules/divoom";

export default route({
  post: method({
    schema: {
      request: frameRequestModel,
      response: frameResponseModel,
    },
    accepts: ["json"],
    async handler(context) {
      const success = sendAnimation(context.request.body.frames);
      
      return {
        body: success,
      };
    },
  }),
});
