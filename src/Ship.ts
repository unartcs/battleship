export default class Ship {
  constructor(
    public readonly name: string,
    public readonly length: number,
    public hp: number = length
  ) {}
  hit(): string {
    if (this.isAlive()) {
      this.hp--;
      return "Ship lost 1 hp";
    } else {
      return "Ship sunk";
    }
  }
  isAlive(): boolean {
    if (this.hp == 0) {
      return false;
    } else return true;
  }
}