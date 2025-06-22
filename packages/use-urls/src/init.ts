import { Command } from "commander";
import { UrlsBuild } from "./cli";
import { join } from "node:path";
import { existsSync, writeFileSync } from "node:fs";
import { hookTemp } from "./hook";
import { indexTemp } from "./indexTemp";
import { execSync } from "node:child_process";
import { SsrTemp } from "./ssr";

export const GenerateCommand = (program: Command) => {
  program
    .command("init")
    .description("create files")
    .option("-p, --path <char>", "path by save result", ".")
    .option("-i, --ignore <char>", "item,item,item ...", ",")
    .option("-o, --omit", "omit hook", false)
    .action((str) => {
      try {
        
        const ignore = str.ignore.split(",");

        const baseUrl = join(str.path, "urls");

        if(!existsSync(baseUrl)) {
          execSync(`mkdir ${baseUrl}`, { stdio: "pipe" });
        }


        const hookPath = join(baseUrl, "useUrls.hook.ts");

        const indexPath = join(baseUrl, 'index.ts');

        const objPath = join(baseUrl, 'index.ts');

        const ssrPath = join(baseUrl, 'index.ts');

        const urlsBuild = new UrlsBuild("app", baseUrl, ignore)
        
        urlsBuild.create();
          
        writeFileSync(join(objPath, "urls.obj.ts"), `export const UrlsObj = ${JSON.stringify(urlsBuild.obj)};`);
        writeFileSync(join(ssrPath, "urls.ssr.ts"), SsrTemp);
        writeFileSync(hookPath, hookTemp);
        writeFileSync(indexPath, indexTemp);
        

      } catch (error) {
        const err = error as Error;

        console.error("Error:", err.message);
      }
    });

  program
    .command("update")
    .description("re generate files")
    .option("-p, --path <char>", "path by save result", ".")
    .option("-i, --ignore <char>", "item,item,item ...", ",")
    .option("-o, --omit", "omit hook", false)
    .action((str) => {
      try {
        
        const ignore = str.ignore.split(",");

        const baseUrl = join(str.path, "urls");

        if(!existsSync(baseUrl)) {
          execSync(`mkdir ${baseUrl}`, { stdio: "pipe" });
        }

        const objPath = join(baseUrl, 'index.ts');

        const urlsBuild = new UrlsBuild("app", baseUrl, ignore)
        
        urlsBuild.create();
          
        writeFileSync(join(objPath, "urls.obj.ts"), `export const UrlsObj = ${JSON.stringify(urlsBuild.obj)};`);

      } catch (error) {
        const err = error as Error;

        console.error("Error:", err.message);
      }
    });
};
