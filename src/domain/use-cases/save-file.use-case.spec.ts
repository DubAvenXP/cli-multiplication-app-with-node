import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('save-file.use-case.ts', () => {
  const fileDestination = 'outputs';
  const customFileDestination = 'custom-destination';

  const clearFileDestination = (dir: string) => {
    const outputFolderExists = fs.existsSync(dir);
    if (outputFolderExists) fs.rmSync(dir, { recursive: true });
  };

  beforeEach(() => {
    // clean up
    clearFileDestination(fileDestination);
    clearFileDestination(customFileDestination);
  });

  afterEach(() => {
    // clean up
    clearFileDestination(fileDestination);
    clearFileDestination(customFileDestination);
  });

  it('saves file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = `${fileDestination}/table.txt`;
    const options = { fileContent: 'test content' };

    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  it('saves file with custom values', () => {
    const saveFile = new SaveFile();
    const fileName = 'custom-file-name';
    const filePath = `${customFileDestination}/${fileName}.txt`;
    const options = {
      fileContent: 'custom content',
      fileName,
      fileDestination: customFileDestination,
    };

    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  it('returns false when an error occurs', () => {
    const saveFile = new SaveFile();
    const options = { fileContent: 'test content' };

    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('mocked error');
    });

    const result = saveFile.execute(options);

    expect(result).toBeFalsy();
    writeFileSyncSpy.mockRestore();
  });
});
