import type { Config } from "@jest/types";
import ts from "typescript";

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFiles: ["<rootDir>/tests/setEnvVars.ts"],
};
export default config;
