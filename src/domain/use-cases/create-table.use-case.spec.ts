import { CreateTable } from './create-table.use-case';
describe('CreateTable', () => {
  it('creates table with default values', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2 });
    const rows = table.split('\n').length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('2 x 1 = 2');
    expect(table).toContain('2 x 10 = 20');
    expect(rows).toBe(10);
  });

  it('creates table with custom limit', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2, limit: 5 });
    const rows = table.split('\n').length;

    expect(table).toContain('2 x 1 = 2');
    expect(table).toContain('2 x 5 = 10');
    expect(table).not.toContain('2 x 6 = 12');
    expect(rows).toBe(5);
  });
});
