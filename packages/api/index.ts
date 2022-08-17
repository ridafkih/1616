import { join } from "path";
import { router } from "18h";

router({
  port: 80,
  routesFolder: join(__dirname, "routes")
})