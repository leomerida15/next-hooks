#!/usr/bin/env node

import { Command } from "commander";
import { GenerateCommand } from "./init";
import { getPackageJson } from "./common";
 

const pkJson = getPackageJson();

const program = new Command();


program
  .name(pkJson.name)
  .description(pkJson.description)
  .version(pkJson.version);

GenerateCommand(program);

program.parse();
