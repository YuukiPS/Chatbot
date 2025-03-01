declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API: string | undefined;
            MODEL: string | undefined;
            MODEL_EMBEDDING: string | undefined;
            maxTokens: string | undefined;
            temperature: string | undefined;
            BASE_URL: string | undefined;
            EMBEDDING_BASE_URL: string | undefined;
            EMBEDDING_API_KEY: string | undefined;
            DISCORD_TOKEN: string | undefined;
            DISCORD_CLIENT_ID: string | undefined;
            DISCORD_GUILD_ID: string | undefined;
        }
    }
}

export {};