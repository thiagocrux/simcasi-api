export function isDurationString(value: string) {
  return /^[1-9]\d*[smhd]$/.test(value);
}
