import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const logger = console;

dotenv.config({
  path: `src/env/.env.${process.env.NODE_ENV || "production"}`,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setUpCookie() {
  logger.info("Setup Cookie is running...");
  logger.info("__dirname:", __dirname);
  const users = [
    {
      name: "OWNER",
      authFile: path.join(
        __dirname,
        `../.auth/${process.env.STANDART_USER}.json`,
      ),
    },
  ];
}
