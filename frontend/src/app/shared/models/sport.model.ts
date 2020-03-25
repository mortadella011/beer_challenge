export class SportModel {
  id: number;
  name: string;
  unit: string;

  constructor(id: number, name: string, unit: string) {
    this.id = id;
    this.name = name;
    this.unit = unit;
  }
}
