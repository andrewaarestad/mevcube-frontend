export class CubeUtils {
  public static convertContractMovesToSingmaster(moves: Array<string>) {
    return moves.map(move => {
      if (move.toLowerCase() !== move) {
        return move;
      } else {
        return move.toUpperCase() + '\'';
      }
    })
  }
}
