export default class Gameboard {
  array:number[][] = []
  constructor(public readonly size: number = 10) {
    for (let i = 0; i<size;i++) {
      this.array[i] = new Array(size);

    }
  }
  showArray() {
    console.log(this.array)
  }
  receiveAttack() {}
}

