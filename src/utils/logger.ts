import chalk from 'chalk';
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

const baseLogger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  ...transport,
  base: {
    pid: false,
  },
});

// Wrapper that automatically adds line breaks
const createLoggerWithSpacing = (logger: pino.Logger) => {
  const width = process.stdout.columns || 80; // fallback to 80 if undefined
  const divider = '\n' + chalk.gray('─'.repeat(width));

  return {
    info: (msg: string, ...args: unknown[]) => {
      return logger.info(`${msg}${divider}`, ...args);
    },
    error: (msg: string, ...args: unknown[]) => {
      return logger.error(`${msg}${divider}`, ...args);
    },
    warn: (msg: string, ...args: unknown[]) => {
      return logger.warn(`${msg}${divider}`, ...args);
    },
    debug: (msg: string, ...args: unknown[]) => {
      return logger.debug(`${msg}${divider}`, ...args);
    },
  };
};

export const logger = createLoggerWithSpacing(baseLogger) as pino.Logger;
