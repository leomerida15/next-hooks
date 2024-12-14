import { Command } from "commander";
import { UrlsBuild } from "./cli";
import { join } from "node:path";
import { existsSync, writeFileSync } from "node:fs";
import { hookTemp } from "./hook";
import { indexTemp } from "./indexTemp";
import { execSync } from "node:child_process";

export const GenerateCommand = (program: Command) => {
  program
    .command("init")
    .description("create files")
    .option("-p, --path <char>", "path by save result", ".")
    .option("-i, --ignore <char>", "item,item,item ...", ",")
    .action((str) => {
      try {
        const ignore = str.ignore.split(",");

        const baseUrl = join(str.path, "urls");

        if(!existsSync(baseUrl)) {
          execSync(`mkdir ${baseUrl}`, { stdio: "pipe" });
        }

        const urlPath = join(baseUrl, "urls.ssr.ts");

        const hookPath = join(baseUrl, "useUrls.hook.ts");

        const indexPath = join(baseUrl, 'index.ts');

        new UrlsBuild("app", urlPath, ignore).create();

        writeFileSync(hookPath, hookTemp);

        writeFileSync(indexPath, indexTemp);
      } catch (error) {
        const err = error as Error;

        console.error("Error:", err.message);
      }
    });
};
