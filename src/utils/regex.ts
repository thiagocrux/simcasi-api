export function isDurationString(value: string) {
  const regexPattern = /^([1-9]\d*)([smhd])$/;

  if (!regexPattern.test(value)) {
    return null;
  }

  return value.match(regexPattern);
}
