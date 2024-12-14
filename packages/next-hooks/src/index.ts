#!/usr/bin/env node

import { Command } from "commander";
import { GenerateCommand } from "./urls";

const program = new Command();

program
  .name("use-urls")
  .description("CLI by generate useUrls and Urls functions by SSR")
  .version("0.1.0");

GenerateCommand(program);

program.parse();
