declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API: string | undefined;
            MODEL: string | undefined;
            MODEL_EMBEDDING: string | undefined;
            maxTokens: number | undefined;
            temperature: number | undefined;
            LMSTUDIO_BASE_URL: string | undefined;
        }
    }
}

export {};