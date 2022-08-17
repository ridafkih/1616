import { join } from "path";
import { router } from "18h";

router({
  port: 8000,
  routesFolder: join(__dirname, "routes"),
});
