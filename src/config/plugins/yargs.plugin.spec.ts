import yargs from 'yargs';

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./yargs.plugin');

    return yarg;
};

describe('yargs.plugin.ts', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it('returns default values', async () => {
    const argv = await runCommand(['-b', '5']);
    const expectedArgv = { b: 5, l: 10, s: false, n: 'table', d: 'outputs' };

    expect(argv).toEqual(expect.objectContaining(expectedArgv));
  });

  it('returns custom values', async () => {
    const argv = await runCommand(['-b', '7', '-l', '20', '-s', '-n', 'test-file-name', '-d', 'test-dir']);
    const expectedArgv = { b: 7, l: 20, s: true, n: 'test-file-name', d: 'test-dir' };

    expect(argv).toEqual(expect.objectContaining(expectedArgv));
  });
});
