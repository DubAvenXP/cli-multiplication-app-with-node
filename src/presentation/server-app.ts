import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileDestination: string;
  fileName: string;
}

export class ServerApp {
  static run({ base, limit, showTable, fileDestination, fileName }: RunOptions) {
    const table = new CreateTable().execute({ base, limit });
    const saved = new SaveFile()
      .execute({
        fileContent: table,
        fileDestination,
        fileName,
      });

    if (showTable) console.log(table);

    saved ? console.log('File saved successfully') : console.log('Error saving file');
  }
}
