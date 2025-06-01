export class Logger {
    private static getTime(): string {
        return new Date().toLocaleTimeString('en-GB', { hour12: false });
    }

    static info(message: string, ...optionalParams: any[]) {
        console.log(`[INFO] ${this.getTime()}:`, message, ...optionalParams);
    }

    static warn(message: string, ...optionalParams: any[]) {
        console.warn(`[WARN] ${this.getTime()}:`, message, ...optionalParams);
    }

    static error(message: string, ...optionalParams: any[]) {
        console.error(`[ERROR] ${this.getTime()}:`, message, ...optionalParams);
    }

    static debug(message: string, ...optionalParams: any[]) {
        console.debug(`[DEBUG] ${this.getTime()}:`, message, ...optionalParams);
    }
}