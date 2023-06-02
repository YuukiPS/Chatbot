import { OpenAIClient } from '@fern-api/openai'
import { OPENAI } from '../../config.json'

export const client = new OpenAIClient({
    token: OPENAI.API
})