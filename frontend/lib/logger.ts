/**
 * Logger Utility for EVS Main Site
 * Provides structured logging with levels and context
 */

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogContext {
  service?: string;
  component?: string;
  userId?: string;
  sessionId?: string;
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: Error;
}

/**
 * Logger class for structured logging
 */
class Logger {
  private serviceName: string;
  private isProduction: boolean;

  constructor(serviceName = "evs-main-site") {
    this.serviceName = serviceName;
    this.isProduction = process.env.NODE_ENV === "production";
  }

  /**
   * Format log entry as JSON
   */
  private formatEntry(entry: LogEntry): string {
    return JSON.stringify({
      ...entry,
      service: this.serviceName,
      error: entry.error
        ? {
            message: entry.error.message,
            stack: entry.error.stack,
            name: entry.error.name,
          }
        : undefined,
    });
  }

  /**
   * Log message with specified level
   */
  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error,
    };

    if (this.isProduction) {
      // In production, use structured JSON logging
      console.log(this.formatEntry(entry));
    } else {
      // In development, use readable console output
      const prefix = `[${entry.timestamp}] [${level}]`;
      const contextStr = context ? ` ${JSON.stringify(context)}` : "";

      switch (level) {
        case LogLevel.ERROR:
          console.error(prefix, message, contextStr, error || "");
          break;
        case LogLevel.WARN:
          console.warn(prefix, message, contextStr);
          break;
        case LogLevel.INFO:
          console.info(prefix, message, contextStr);
          break;
        case LogLevel.DEBUG:
          console.debug(prefix, message, contextStr);
          break;
      }
    }

    // Future: Send to monitoring service (e.g., Sentry, Datadog)
    // this.sendToMonitoring(entry);
  }

  /**
   * Log debug message (development only)
   */
  debug(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      this.log(LogLevel.DEBUG, message, context);
    }
  }

  /**
   * Log info message
   */
  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  /**
   * Log CMS fetch event
   */
  cmsFetch(
    endpoint: string,
    status: "success" | "error" | "retry",
    context?: LogContext
  ): void {
    const message = `CMS Fetch [${endpoint}]: ${status}`;
    if (status === "error") {
      this.error(message, undefined, { ...context, endpoint });
    } else if (status === "retry") {
      this.warn(message, { ...context, endpoint });
    } else {
      this.info(message, { ...context, endpoint });
    }
  }

  /**
   * Log API request
   */
  apiRequest(
    method: string,
    path: string,
    statusCode: number,
    duration?: number,
    context?: LogContext
  ): void {
    const message = `API ${method} ${path} - ${statusCode}`;
    const logContext = {
      ...context,
      method,
      path,
      statusCode,
      duration: duration ? `${duration}ms` : undefined,
    };

    if (statusCode >= 500) {
      this.error(message, undefined, logContext);
    } else if (statusCode >= 400) {
      this.warn(message, logContext);
    } else {
      this.info(message, logContext);
    }
  }

  /**
   * Log user action (with consent awareness)
   */
  userAction(action: string, context?: LogContext): void {
    // Only log if analytics consent given (check in caller)
    this.info(`User Action: ${action}`, context);
  }

  /**
   * Log build/deployment event
   */
  deployment(event: string, context?: LogContext): void {
    this.info(`Deployment: ${event}`, context);
  }
}

// Export singleton logger instance
export const logger = new Logger("evs-main-site");

// Export helper functions
export const logDebug = (message: string, context?: LogContext) =>
  logger.debug(message, context);
export const logInfo = (message: string, context?: LogContext) =>
  logger.info(message, context);
export const logWarn = (message: string, context?: LogContext) =>
  logger.warn(message, context);
export const logError = (message: string, error?: Error, context?: LogContext) =>
  logger.error(message, error, context);
