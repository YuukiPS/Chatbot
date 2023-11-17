import { OpenAI } from 'openai'
import { OPENAI } from '../../config.json'

export const client = new OpenAI({
    apiKey: OPENAI.API
})