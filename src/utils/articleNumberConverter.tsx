export function padWithZeros(str: string) {
  while (str.length < 6) {
    str = '0' + str
  }
  return str
}
