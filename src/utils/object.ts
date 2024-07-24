export function set(obj: Record<string, any>, path: string[], value: any): void {
  let current = obj
  for (let i = 0; i < path.length; i++) {
    if (i === path.length - 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      current[path[i]] = value
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      current[path[i]] = current[path[i]] || {}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      current = current[path[i]]
    }
  }
}
