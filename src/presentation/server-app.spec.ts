import fs from 'fs';

import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('server-app.ts', () => {
  const logSpy = jest.spyOn(console, 'log');
  const logErrorSpy = jest.spyOn(console, 'error');
  const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
  const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

  const options = {
    base: 33,
    showTable: false,
    fileDestination: 'test-destination',
    fileName: 'test-name',
    limit: 22,
  }

  afterEach(() => {
    const outputFolderExists = fs.existsSync(options.fileDestination);
    if (outputFolderExists) fs.rmSync(options.fileDestination, { recursive: true });

    jest.clearAllMocks();
  });

  it('should create ServerApp instance', () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(ServerApp).toHaveProperty('run');
    expect(typeof ServerApp.run).toBe('function');
  });

  it('runs ServerApp with options', () => {
    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Running ServerApp');
    expect(logSpy).toHaveBeenLastCalledWith('File saved successfully');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({ base: 33, limit: 22 });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  it('runs ServerApp with options and shows table', () => {
    const options = {
      base: 33,
      showTable: true,
      fileDestination: 'test-destination',
      fileName: 'test-name',
      limit: 22,
    }

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(3);
  });

  it('logs error when saving file', () => {
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute').mockReturnValueOnce(false);

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logErrorSpy).toHaveBeenCalledTimes(1);

    expect(logErrorSpy).toHaveBeenLastCalledWith('Error saving file');

    saveFileSpy.mockRestore();
  });

  it('runs with custom values mocked', () => {
    const createMock = jest.fn().mockReturnValueOnce('test-table');
    const saveFileMock = jest.fn().mockReturnValueOnce(true);
    const consoleLogMock = jest.fn();
    const consoleErrorMock = jest.fn();

    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;
    global.console.log = consoleLogMock;
    global.console.error = consoleErrorMock;

    ServerApp.run(options)

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({ base: 33, limit: 22 });
    expect(saveFileMock).toHaveBeenCalledTimes(1);
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: 'test-table',
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(consoleLogMock).toHaveBeenCalledTimes(2);
    expect(consoleLogMock).toHaveBeenCalledWith('Running ServerApp');
    expect(consoleLogMock).toHaveBeenLastCalledWith('File saved successfully');
    expect(consoleErrorMock).not.toHaveBeenCalled();
  });

  it('fails when trying to save file', () => {
    const createMock = jest.fn().mockReturnValueOnce('test-table');
    const saveFileMock = jest.fn().mockReturnValueOnce(false);
    const consoleLogMock = jest.fn();
    const consoleErrorMock = jest.fn();

    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;
    global.console.log = consoleLogMock;
    global.console.error = consoleErrorMock;

    ServerApp.run(options)

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({ base: 33, limit: 22 });
    expect(saveFileMock).toHaveBeenCalledTimes(1);
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: 'test-table',
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
    expect(consoleLogMock).toHaveBeenCalledWith('Running ServerApp');
    expect(consoleErrorMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorMock).toHaveBeenLastCalledWith('Error saving file');
  });
});
