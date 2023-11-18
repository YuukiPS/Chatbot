export enum Colors {
    Red = '\x1b[31m',
    Green = '\x1b[32m',
    Yellow = '\x1b[33m',
    Blue = '\x1b[34m',
    Reset = '\x1b[0m'
}

/**
 * Logger class for logging to console
 * @class Logger
 * @example
 * ```typescript
 * const log = Logger.log('Hello World', 'Title');
 * log.continue('. Bye World');
 * await new Promise((resolve) => setTimeout(resolve, 1000));
 * log.continue('!');
 * await new Promise((resolve) => setTimeout(resolve, 1000));
 * log.new('Hey i\'m back');
 * log.end();
 * ```
 */
class Logger {
    private static instance: Logger | null = null;
    private logHistory: string[] = [];

    private constructor() { }

    /**
     * Log to console
     * @param {string} message Message to log
     * @param {string} title Title of the log
     * @returns {Logger} Logger instance
     * @example
     * ```typescript
     * Logger.log('Hello World', 'Title');
     * > [Chatbot -> Title]: Hello World
     * ```
     */
    static log(message: string, title?: string): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        Logger.instance.logHistory.push(message);
        process.stdout.write(`\r[${Colors.Blue}Chatbot${Colors.Reset} -> ${Colors.Green}${title || 'Log'}${Colors.Reset}]: ${message}`);

        return Logger.instance;
    }

    /**
     * Replace last log with new message
     * @param {string} message Message to log
     * @returns {Logger} Logger instance
     * @example
     * ```typescript
     * const log = Logger.log('Hello World', 'Title');
     * log.continue('. Bye World');
     * > Bye World
     */
    new(message: string): void {
        process.stdout.write(`\r\x1b[2K${message}`);
        this.logHistory.push(message);
    }

    /**
     * Add message or continue last log
     * @param {string} message Message to log
     * @returns {Logger} Logger instance
     * @example
     * ```typescript
     * const log = Logger.log('Hello World', 'Title');
     * log.continue('. Bye World');
     * > [Chatbot -> Title]: Hello World. Bye World
     */
    continue(message: string): void {
        this.logHistory.push(message);
        process.stdout.write(`${message}`);
    }

    /**
     * End log by adding a new line
     * @returns {Logger} Logger instance
     * @example
     * ```typescript
     * Logger.log('Hello World', 'Title').end();
     * ```
     */
    end(): void {
        this.logHistory = [];
        process.stdout.write('\n');
    }
}

export default Logger;