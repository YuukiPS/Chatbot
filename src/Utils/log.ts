class Logger {
    private static instance: Logger | null = null;
    private logHistory: string[] = [];

    private constructor() { }

    static log(message: string): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        Logger.instance.logHistory.push(message);
        process.stdout.write(`\r${message}`);

        return Logger.instance;
    }

    new(message: string): void {
        this.logHistory.push(message);
        process.stdout.write(`\r\x1b[2K${message}`);
    }

    continue(message: string): void {
        this.logHistory.push(message);
        process.stdout.write(`${message}`);
    }

    end(): void {
        this.logHistory = [];
        process.stdout.write('\n');
    }
}

export default Logger;