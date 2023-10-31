import fs from 'fs';

const base = 5;
const fileDir = 'outputs';
const fileName = `table-${base}.txt`;
const filePath = `${fileDir}/${fileName}`;
let output = '';

if (!fs.existsSync('outputs')) fs.mkdirSync('outputs', { recursive: true });

try {
  output = `
================================
      Number ${base} table
================================\n
`;

  for (let i = 1; i <= 10; i++) {
    output += `${base} x ${i} = ${base * i}\n`;
  }

  console.log(output);
  fs.writeFileSync(filePath, output);
} catch (err) {
  console.error('Error: ', err);
}
