# use-urls

> CLI by generate useUrls and Urls functions by SSR.

## install

```bash
  npm i @next-hooks/use-urls
```

```bash
  bun add @next-hooks/use-urls
```

```bash
  pnpm add @next-hooks/use-urls
```

```bash
  yarn add @next-hooks/use-urls
```

## get start

### run commnad

```bash
  npm run use-urls -p '<your utils folder path>'
```

### client component

```bash
"use client";
import React from "react";
import { useUrls } from "@/useUrls.hook";

export const Example = () => {
  const urls = useUrls();

  return <div>{urls.panel.root}</div>;
};
```

### server component

```bash
import React from "react";
import { Urls } from "@/urls.ssr";

export const Example = () => {
  const urls = Urls();

  return <div>{urls.panel.root}</div>;
};
```

```bash
Usage: use-urls [options] [command]

CLI by generate useUrls and Urls functions by SSR

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init [options]  create folder structure and generate types basic by typescript
  help [command]  display help for command
```

## Options

* -V, --version   output the version number

* -h, --help      display help for command

## Commands

* init [options]  create folder structure and generate types basic by typescript.

* help [command]  display help for command.

### Init

```bash
  npm run use-urls init -p 'app/' -i "commonn,utils,api"
```

```bash
Usage: use-urls init [options]

create folder structure and generate types basic by typescript

Options:
  -p, --path <char>    path by save result (default: ".")
  -i, --ignore <char>  item,item,item ... (default: ",")
  -h, --help           display help for command
```

#### init Options

* -p, --path path by save result (default: ".").

* -i, --ignore item,item,item ... (default: ",").
