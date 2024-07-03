export function changeWordByNumber(number: number, word1: string, word2: string, word3: string): string {
  switch (number) {
    case 1:
      return word1
    case 2:
    case 3:
    case 4:
      return word2
    default:
      return word3
  }
}
