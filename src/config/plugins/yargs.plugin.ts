import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Base number to multiply',
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Limit of the multiplication table',
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show the multiplication table in the console',
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'table',
    describe: 'Name of the file to save',
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'Destination folder of the file to save',
  })
  .check((argv, _options) => {
    if (isNaN(argv.b)) throw new Error('The base must be a number');
    if (argv.b < 0) throw new Error('The base must be a positive number');

    if (isNaN(argv.l)) throw new Error('The limit must be a number');
    if (argv.l < 0) throw new Error('The limit must be a positive number');

    return true;
  })
  .parseSync();
