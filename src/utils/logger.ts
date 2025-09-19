import pino from 'pino';

const transport =
  process.env.NODE_ENV === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: `${JSON.stringify(new Date().toLocaleString())}`,
          },
        },
      }
    : {};

export const logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  ...transport,
  base: {
    pid: false,
  },
});
