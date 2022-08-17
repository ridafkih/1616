import axios from "axios";
import { getPixels } from "modules/pixel-map";
import type { PixelResponseSchema } from "packages/api/models/pixel-requests";

const { RASPBERRY_PI_IP } = process.env;

/**
 * Sends a request to the Raspberry Pi to update the screen.
 *
 * @param frames The frame buffer data as an array of base64 values.
 * @returns Whether or not the message was communicated to the Divoo.
 */
export const makeUpdateScreenRequest = (frames: string[]) => {
  if (!RASPBERRY_PI_IP) return console.error("RASPBERRY_PI_IP not set");

  const pixels = getPixels();
  const data = { frames, pixels };

  return axios
    .post<null, boolean, PixelResponseSchema>(
      `http://${RASPBERRY_PI_IP}/set-screen`,
      data
    )
    .catch((error) => {
      console.error(error);
      return false;
    });
};
