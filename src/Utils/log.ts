import util from 'util'

export enum Colors {
    Red = '\x1b[31m',
    Green = '\x1b[32m',
    Yellow = '\x1b[33m',
    Blue = '\x1b[34m',
    Reset = '\x1b[0m'
}

/**
 * A logger class.
 * 
 * @class Logger
 * @example
 * ```typescript
 * const logger = new Logger()
 * logger.log('Hello World!').start()
 * > [Chatbot -> ]: Hello World!
 * logger.continue('. This is a test.')
 * > [Chatbot -> ]: Hello World!. This is a test.
 * logger.end(4)
 * > [Chatbot -> ]: Hello World!. This is a test.
 * >
 * >
 * >
 * >
 * ```
 */
class Logger {
    private logHistory: any[] = [];
    private titleName: string = '';

    public constructor() { }

    private print(...message: any[]): string {
        return util.formatWithOptions({ colors: true, depth: null, showHidden: false}, ...message)
    }

    private chatbotFormat(...message: any[]): string {
        return `\r[${Colors.Blue}Chatbot${Colors.Reset} -> ${Colors.Green}${this.titleName}${Colors.Reset}]: ${this.print(...message)}`
    }

    /**
     * Add a log to the log history.
     * @param {any[]} message The message to log.
     * @returns {Logger} The logger instance.
     */
    log(...message: any[]): Logger {
        this.logHistory.push(...message);
        return this;
    }

    /**
     * Print and replace the last log.
     * 
     * @param {boolean} chatbotFormat Whether to print in chatbot format.
     * @param {any[]} message The message to log.
     * @returns {Logger} The logger instance.
     */
    new(chatbotFormat?: boolean, ...message: any[]): Logger {
        this.logHistory.push(...message);
        let log;
        if (chatbotFormat) {
            log = this.chatbotFormat(...message);
        } else {
            log = this.print(...message);
        }
        process.stdout.write(`\r\x1b[2K${log}`);
        return this;
    }

    /**
     * Set the title of the logger. This will be used in chatbot format.
     * 
     * @param {string} titleName The title name.
     * @returns {Logger} The logger instance.
     */
    title(titleName: string): Logger {
        this.titleName = titleName;
        return this;
    }

    /**
     * Continue the last log.
     * 
     * @param {any[]} message The message to log.
     * @returns {Logger} The logger instance.
     */
    continue(...message: any[]): Logger {
        this.logHistory.push(...message);
        process.stdout.write(this.print(...message))
        return this;
    }

    /**
     * End the last log.
     * 
     * @param {number} newline The number of newlines to print.
     */
    end(newline?: number): void {
        this.logHistory = [];
        process.stdout.write('\n'.repeat(newline || 1));
    }

    /**
     * Start the logger.
     * 
     * @returns {Logger} The logger instance.
     */
    start(): Logger {
        const getLog = this.logHistory;
        this.logHistory = [];
        process.stdout.write(this.chatbotFormat(...getLog));
        return this;
    }
}

export default Logger;