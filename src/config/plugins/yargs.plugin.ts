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
  .check((argv, options) => {
    if (isNaN(argv.b)) throw 'Error: The base must be a number';
    if (argv.b < 0) throw 'Error: The base must be a positive number';

    if (isNaN(argv.l)) throw 'Error: The limit must be a number';
    if (argv.l < 0) throw 'Error: The limit must be a positive number';

    return true;
  })
  .parseSync();
