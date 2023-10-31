import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b: base, s: showTable, l: limit } = yarg;

const fileDir = 'outputs';
const fileName = `table-${base}.txt`;
const filePath = `${fileDir}/${fileName}`;

let output = '';

if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });

try {
  output = `
================================
      Number ${base} table
================================\n
`;

  for (let i = 1; i <= limit; i++) {
    output += `${base} x ${i} = ${base * i}\n`;
  }

  if (showTable) console.log(output);

  fs.writeFileSync(filePath, output);
} catch (err) {
  console.error('Error: ', err);
}
