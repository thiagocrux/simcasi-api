export function isDurationString(value: string) {
  return value.match(/^(\d+)([smhd])$/);
}
