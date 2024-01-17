# Chatbot

A chatbot that can be used to answer questions about the YuukiPS Private Server. It is built using the [OpenAI API](https://openai.com/blog/openai-api) or [Gemini](https://ai.google.dev/).

Dataset can be found in [here](./src/data/dataset.md).

## Run

First compile TypeScript to JavaScript:

```bash
npm run build
```

Before you run the chatbot, you need to set the OpenAI or Gemini API key in `.env` file. You can get the API key from [here](https://platform.openai.com/account/api-keys) or [here](https://makersuite.google.com/app/apikey).

And embed the dataset using command:

```bash
npm run embed
```

Then you can run the chatbot using command:

```bash
npm run start
```
