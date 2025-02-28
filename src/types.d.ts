declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API: string | undefined;
            MODEL: string | undefined;
            MODEL_EMBEDDING: string | undefined;
            maxTokens: string | undefined;
            temperature: string | undefined;
            BASE_URL: string | undefined;
        }
    }
}

export {};