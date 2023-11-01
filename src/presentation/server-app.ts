import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
}

export class ServerApp {
  static run({ base, limit, showTable }: RunOptions) {
    const table = new CreateTable().execute({ base, limit });
    const saved = new SaveFile()
      .execute({
        fileContent: table,
        fileDestination: `table-${base}`,
      });

    if (showTable) console.log(table);

    saved ? console.log('File saved successfully') : console.log('Error saving file');
  }
}
