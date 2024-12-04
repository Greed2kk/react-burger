export const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  time: number,
): ((...args: Parameters<T>) => void) => {
  let timeout = 0

  return (...args: Parameters<T>) => {
    const current = Date.now()

    if (current - timeout > time) {
      fn(...args)
      timeout = Date.now()
    }
  }
}
