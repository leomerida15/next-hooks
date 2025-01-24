#!/usr/bin/env node

import { Command } from "commander";
import { GenerateCommand } from "./init";
import { getPackageJson } from "./common";
 

const pkJson = getPackageJson();

const command = new Command();


command
  .version(pkJson.version)
  .name("use-urls")
  .description(pkJson.description);

GenerateCommand(command);

command.parse();
