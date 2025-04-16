def factorial(n: int) -> int:
    """
    Calculates the factorial of a number using recursion.

    Args:
        n (int): A non-negative integer.

    Returns:
        int: The factorial of n.
    """
    if n < 0:
        raise ValueError("Input must be a non-negative integer")

    # Base case: factorial of 0 or 1 is 1
    if n == 0 or n == 1:
        return 1

    # Recursive case: n * factorial of (n - 1)
    return n * factorial(n - 1)
