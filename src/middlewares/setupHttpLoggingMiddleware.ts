import chalk from 'chalk';
import express, { Request, Response } from 'express';
import morgan from 'morgan';

export function setupHttpLoggingMiddleware(app: express.Application) {
  if (process.env.NODE_ENV === 'development') {
    // Log request body
    app.use((request, _response, next) => {
      if (request.body) {
        console.log('Request Body:', request.body);
      }

      next();
    });

    /* CUSTOM TOKENS */

    // Custom morgan token for datetime
    morgan.token('datetime', () => `[${new Date().toLocaleString()}]`);

    // Custom morgan token for colored status
    morgan.token('colored-status', (request: Request, response: Response) => {
      const status = response.statusCode;
      if (status >= 500) return chalk.red(status.toString());
      if (status >= 400) return chalk.yellow(status.toString());
      if (status >= 300) return chalk.cyan(status.toString());
      if (status >= 200) return chalk.green(status.toString());
      return chalk.white(status.toString());
    });

    // Custom morgan token for response body
    morgan.token('response-body', (request: Request, response: Response) => {
      if (response.locals.responseBody) {
        const formatted =
          typeof response.locals.responseBody === 'object'
            ? JSON.stringify(response.locals.responseBody, null, 2)
            : response.locals.responseBody;

        return chalk.gray(formatted.replace(/\\/g, ''));
      }

      return '';
    });

    // Custom morgan token for request body
    morgan.token('body', (request: Request) => {
      if (request.body) {
        const safeBody = { ...request.body };

        if (safeBody.password) {
          safeBody.password = '[REDACTED]';
        }

        // Add more fields as needed
        const formatted =
          typeof safeBody === 'object'
            ? JSON.stringify(safeBody, null, 2)
            : safeBody;

        return chalk.cyan(formatted.replace(/\\/g, ''));
      }
      return '';
    });

    // Custom morgan token for divider
    morgan.token('divider', () => {
      const width = process.stdout.columns || 80; // fallback to 80 if undefined
      return chalk.gray('─'.repeat(width)) + '\n';
    });

    app.use(
      morgan(
        `:divider:datetime ${chalk.blue(
          ':method'
        )} :url :colored-status ${chalk.gray(
          ':response-time ms'
        )}\nRequest: :body\nResponse: :response-body`
      )
    );

    // Capture response body
    app.use((request, response, next) => {
      const oldSend = response.send;

      response.send = function (...args) {
        response.locals.responseBody = args[0];
        return oldSend.apply(response, args);
      };

      next();
    });
  } else {
    // Production logging: minimal, no bodies, no colors
    app.use(
      morgan(':method :url :status :response-time ms - :res[content-length]')
    );
  }
}
