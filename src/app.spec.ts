import { ServerApp } from "./presentation/server-app";

describe('app.ts', () => {
  it('should be true', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;

    process.argv = ['node', 'app', '-b', '33', '-l', '22', '-s', '-d', 'test-destination', '-n', 'test-name'];

    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 33,
      limit: 22,
      showTable: true,
      fileDestination: 'test-destination',
      fileName: 'test-name',
    });
  });
});
