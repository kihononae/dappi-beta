/**
 * Logger utility class for standardized logging with timestamps and log levels.
 * Provides static methods for info, warning, error, and debug messages.
 */
export class Logger {
    /**
     * Gets the current time as a string in HH:mm:ss format.
     * @returns The current time string.
     */
    private static getTime(): string {
        return new Date().toLocaleTimeString('en-GB', { hour12: false });
    }

    /**
     * Logs an informational message.
     * @param message - The main message to log.
     * @param optionalParams - Additional parameters to log.
     */
    static info(message: string, ...optionalParams: any[]) {
        console.log(`[INFO] ${this.getTime()}`, message, ...optionalParams);
    }

    /**
     * Logs a warning message.
     * @param message - The main warning message to log.
     * @param optionalParams - Additional parameters to log.
     */
    static warn(message: string, ...optionalParams: any[]) {
        console.warn(`[WARN] ${this.getTime()}`, message, ...optionalParams);
    }

    /**
     * Logs an error message.
     * @param message - The main error message to log.
     * @param optionalParams - Additional parameters to log.
     */
    static error(message: string, ...optionalParams: any[]) {
        console.error(`[ERROR] ${this.getTime()}`, message, ...optionalParams);
    }

    /**
     * Logs a debug message.
     * @param message - The main debug message to log.
     * @param optionalParams - Additional parameters to log.
     */
    static debug(message: string, ...optionalParams: any[]) {
        console.debug(`[DEBUG] ${this.getTime()}`, message, ...optionalParams);
    }
}