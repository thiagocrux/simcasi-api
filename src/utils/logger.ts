import pino from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: `${JSON.stringify(new Date().toLocaleString())}`,
    },
  },
  base: {
    pid: false,
  },
});
