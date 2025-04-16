/*
 * Calculates the factorial of a number using recursion.
 *
 * @param n - A non-negative integer
 * @returns The factorial of n
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Input must be a non-negative integer')
  }

  // Base case: factorial of 0 or 1 is 1
  if (n === 0 || n === 1) {
    return 1
  }

  // Recursive case: n * factorial of (n - 1)
  return n * factorial(n - 1)
}
