import util from 'util'

/**
 * A list of colors.
 */
export enum Colors {
    Red = '\x1b[31m',
    Green = '\x1b[32m',
    Yellow = '\x1b[33m',
    Blue = '\x1b[34m',
    Magenta = '\x1b[35m',
    Cyan = '\x1b[36m',
    White = '\x1b[37m',
    BgRed = '\x1b[41m',
    BgGreen = '\x1b[42m',
    BgYellow = '\x1b[43m',
    BgBlue = '\x1b[44m',
    BgMagenta = '\x1b[45m',
    BgCyan = '\x1b[46m',
    BgWhite = '\x1b[47m',
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
 * > [Chatbot -> Log]: Hello World!
 * logger.continue('. This is a test.')
 * > [Chatbot -> Log]: Hello World!. This is a test.
 * logger.end(4)
 * > [Chatbot -> Log]: Hello World!. This is a test.
 * >
 * >
 * >
 * >
 * ```
 */
class Logger {
    private titleName: string = '';
    private colors: Colors | undefined = undefined;

    public constructor() { }

    /**
     * Format messages with util.formatWithOptions
     * @param message - The messages to format
     * @returns Formatted string
     */
    private print(...message: unknown[]): string {
        return util.formatWithOptions({ colors: true, depth: null, showHidden: false}, ...message)
    }

    /**
     * Format a message in the Chatbot format
     * @param message - The messages to format
     * @returns Formatted string with chatbot styling
     */
    private chatbotFormat(...message: unknown[]): string {
        return `\r[${Colors.Blue}Chatbot${Colors.Reset} -> ${this.colors || Colors.Green}${this.titleName || 'Log'}${Colors.Reset}]: ${this.print(...message)}`
    }

    /**
     * Add a log to the log history.
     * @param message - The message parts to log
     * @returns The logger instance for method chaining
     */
    log(...message: unknown[]): Logger {
        process.stdout.write(this.chatbotFormat(...message));
        return this;
    }

    /**
     * Print and replace the last log.
     * 
     * @param chatbotFormat - Whether to print in chatbot format
     * @param message - The message parts to log
     * @returns The logger instance for method chaining
     */
    new(chatbotFormat?: boolean, ...message: unknown[]): Logger {
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
     * @param titleName - The title name
     * @returns The logger instance for method chaining
     */
    title(titleName: string): Logger {
        this.titleName = titleName;
        return this;
    }

    /**
     * Set the color of the title. This will be used in chatbot format.
     * 
     * @param color - The color
     * @returns The logger instance for method chaining
     */
    color(color: Colors): Logger {
        this.colors = color;
        return this;
    }

    /**
     * Continue the last log.
     * 
     * @param message - The message parts to append
     * @returns The logger instance for method chaining
     */
    continue(...message: unknown[]): Logger {
        process.stdout.write(this.print(...message))
        return this;
    }

    /**
     * End the last log.
     * 
     * @param newline - The number of newlines to print
     */
    end(newline?: number): void {
        process.stdout.write('\n'.repeat(newline || 1));
    }

}

export default Logger;