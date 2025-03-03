import { MongoDB } from './MongoDB';

interface AISettings {
    enabled: boolean;
    prompt: string | null;
}

interface AISettingsDocument {
    channelId: string;
    enabled: boolean;
    prompt: string | null;
}

export class AISettingsCache {
    private static cache = new Map<string, AISettings>();

    private static initialized = false;

    public static async initialize(): Promise<void> {
        try {
            const mongodb = MongoDB.getInstance();
            const settings = await mongodb.find<AISettingsDocument>('aiSettings', {});

            for (const setting of settings) {
                this.cache.set(setting.channelId, {
                    enabled: setting.enabled,
                    prompt: setting.prompt,
                });
            }

            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize AI settings cache:', error);
            throw error;
        }
    }

    public static get(channelId: string): AISettings | undefined {
        return this.cache.get(channelId);
    }

    public static set(channelId: string, settings: AISettings): void {
        this.cache.set(channelId, settings);
    }

    public static isInitialized(): boolean {
        return this.initialized;
    }
}
