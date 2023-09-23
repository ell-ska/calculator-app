const signs = ['÷', '*', '-', '+']

const math = (a: number, b: number, sign: string): number => {
  if (b === 0 && sign === '÷') return NaN

  return sign === '+' //
    ? a + b
    : sign === '-'
    ? a - b
    : sign === '*'
    ? a * b
    : a / b
}

const endsWithSign = (string: string): boolean => {
  return signs.some(sign => string.endsWith(sign))
}

const sliceAtLastSign = (string: string): string => {
  const signIndexes = signs.map(sign => string.lastIndexOf(sign))
  const lastIndex = Math.max(...signIndexes)
  return string.slice(0, lastIndex + 1)
}

export { math, endsWithSign, sliceAtLastSign }
