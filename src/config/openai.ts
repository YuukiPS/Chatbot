import { OpenAI } from 'openai'
import dotenv from 'dotenv';

dotenv.config();

export const client = new OpenAI({
    apiKey: process.env.API
})