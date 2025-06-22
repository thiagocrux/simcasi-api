import { isDurationString } from './regex';

export function convertDurationStringToMilliseconds(duration: string) {
  if (typeof duration !== 'string') {
    return null;
  }

  const match = isDurationString(duration);

  if (!match) {
    return null;
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
  }
}

export function generateSessionTimeframe(duration: string) {
  if (!isDurationString(duration)) {
    return null;
  }

  const issuedAt = new Date();

  const expiresAt = new Date(
    issuedAt.getTime() + convertDurationStringToMilliseconds(duration)!
  );

  return { issuedAt, expiresAt };
}
