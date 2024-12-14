import { readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

export class UrlsBuild {
  entry: string[] = [];

  obj: any = {};

  app_path: string;
  output_path: string;

  ignore: string[] = [];

  urlFormat(url: string) {
    return url
      .split("/")
      .filter((item) => !item.includes("("))
      .join("/")
      .replace(resolve(this.app_path), "");
  }

  constructor(input: string, output: string, ignore: string[]) {
    this.app_path = resolve(input); // Ruta del directorio app de Next.js
    this.output_path = resolve(output); // Ruta de la carpeta donde se generarán los archivos de rutas
    this.ignore = ignore;
  }

  create() {
    this.leerCarpetas(this.app_path);

    this.crearObj();

    this.createFile();
  }

  leerCarpetas(currentPath: string) {
    const archivos = readdirSync(currentPath); // Obtener archivos y carpetas de la ruta actual

    if (archivos.includes("page.tsx")) {
      this.entry.push(this.urlFormat(currentPath));
    }

    const folders = archivos.filter(
      (archivo) => !archivo.includes(".") && !this.ignore.includes(archivo)
    );

    folders.map((dir) => {
      const rutaDir = join(currentPath, dir);
      // const stats = statSync(rutaDir);

      this.leerCarpetas(rutaDir);
    });
  }

  crearObj() {
    for (const cadena of this.entry) {
      const keys = cadena.split("/");
      keys.shift();

      let currentObj = this.obj;

      // Recorrer cada campo y crear la estructura del objeto
      for (const key of keys) {
        if (!currentObj[key.replace(/\[|\]/g, "")])
          currentObj[key.replace(/\[|\]/g, "")] = {};

        if (key === keys.at(-1)) {
          currentObj[key.replace(/\[|\]/g, "")] = { root: cadena };
        }

        currentObj = currentObj[key.replace(/\[|\]/g, "")]; // Avanzar al siguiente nivel del objeto
      }
    }
  }

  createFile() {
    const content = `export const Urls = () => (${JSON.stringify(this.obj)});`;

    writeFileSync(this.output_path, content);
  }
}
