import fs from 'fs';

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() /**
   * DI - Dependency Injection
   */ {}

  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table',
  }: Options) {
    try {
      const dirExists = fs.existsSync(fileDestination);
      if (!dirExists) fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
      return true;
    } catch (error) {
      // console.error('Error: ', error); // Use winston instead
      return false;
    }
  }
}
