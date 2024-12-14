import { readFile, writeFile } from 'fs';
import { join } from 'path';

const files = ['use-urls.esm.js', 'index.js'];

for (const file of files) {
    const filePath = join(__dirname, 'dist', file); // Cambia a la ruta correcta si es necesario
    const shebang = '#!/usr/bin/env node\n';

    // Prepend shebang to the file
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Check if the shebang is already there
        if (!data.startsWith(shebang)) {
            // Write the file back with shebang
            writeFile(filePath, shebang + data, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('Shebang added successfully');
                }
            });
        }
    });
}
