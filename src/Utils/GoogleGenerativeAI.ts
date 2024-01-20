import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export interface ContentRequest {
    role: 'user' | 'model';
    parts: Part;
}

export interface FunctionDeclaration {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: Record<string, unknown>;
        required: string[];
    };
}

export interface Tool {
    function_declarations: FunctionDeclaration[];
}

export interface ApiRequest {
    contents: ContentRequest | ContentRequest[];
    tools?: Tool[];
    safetySettings?: SafetyRating[];
    generationConfig?: GenerationConfig;
}

export interface GenerationConfig {
    stopSequences?: string[];
    candidateCount?: number;
    maxOutputTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
}

export interface GeminiResponse {
    candidates: Candidate[];
    promptFeedback: PromptFeedback;
}

export interface Candidate {
    content: Content;
    finishReason: string;
    index: number;
    safetyRatings: SafetyRating[];
}

export interface Content {
    parts: Part[];
    role: string | 'model';
}

export interface SafetySetting { }

export enum HarmCategory {
    /** Harassment content. */
    'Harassment' = 'HARM_CATEGORY_HARASSMENT',
    /** Hate speech and content. */
    'HateSpeech' = 'HARM_CATEGORY_HATE_SPEECH',
    /** Sexually explicit content. */
    'SexuallyExplicit' = 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    /** Dangerous content. */
    'DangerousContent' = 'HARM_CATEGORY_DANGEROUS_CONTENT',
}

export enum HarmBlockThreshold {
    /** All content will be allowed. */
    'None' = 'BLOCK_NONE',
    /** Content with NEGLIGIBLE will be allowed. */
    'LowAndAbove' = 'BLOCK_LOW_AND_ABOVE',
    /** Content with NEGLIGIBLE and LOW will be allowed. */
    'MediumAndAbove' = 'BLOCK_MEDIUM_AND_ABOVE',
    /** Content with NEGLIGIBLE, LOW, and MEDIUM will be allowed. */
    'OnlyHigh' = 'BLOCK_ONLY_HIGH',
    /** Threshold is unspecified. */
    'Unspecified' = 'HARM_BLOCK_THRESHOLD_UNSPECIFIED',
}

export interface Part {
    text?: string;
    inlineData?: Blob;
    functionCall?: FunctionCallingResponse | undefined;
    functionResponse?: {
        name: string;
        response: object;
    };
}

export interface Blob {
    mimeType: string;
    data: string;
}

export interface FunctionCallingResponse {
    name: string;
    args: any;
}

export interface SafetyRating {
    category: HarmCategory;
    threshold: HarmBlockThreshold;
}

export interface PromptFeedback {
    safetyRatings: SafetyRating2[];
}

export interface SafetyRating2 {
    category: string;
    probability: string;
}

export default class GoogleGenerativeAI {
    private apiKey: string;

    constructor(apiKey: string) {
        if (apiKey === '') {
            throw new Error('API key is empty');
        }
        if (!apiKey) {
            throw new Error('API key is required');
        }
        this.apiKey = apiKey;
    }

    private async makeApiRequest(model: string, data: ApiRequest): Promise<AxiosResponse> {
        const config: AxiosRequestConfig = {
            params: {
                key: this.apiKey,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            data,
            config,
        );
    }

    async generateContent(model: string, request: ApiRequest): Promise<GeminiResponse | undefined> {
        try {
            const sendRequest = await this.makeApiRequest(model, request);

            return sendRequest.data as GeminiResponse;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`${error.response ? error.response.data.error.message : 'Unknown error'}`);
            } else {
                throw error;
            }
        }
    }
}
