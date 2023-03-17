# Chatbot

This is a simple chatbot that uses the Rasa framework to handle user input and generate responses.

## Contributing

Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. Fork this repository.
2. Create a new branch for your changes.
3. Make your changes and test them thoroughly.
4. Submit a pull request.

Please make sure that your code follows the existing style and conventions, and that any new features or changes are well-documented.

## Acknowledgments

This chatbot was developed using the Rasa framework, which is an open source tool for building chatbots and voice assistants. We would like to thank the Rasa community for their contributions and support.

## References

[Rasa documentation](https://rasa.com/docs/)\
[Rasa GitHub repository](https://github.com/RasaHQ/rasa)

## Installation

### Install Rasa

To use the chatbot, you need to have Rasa installed. You can install it using pip:

```bash
pip install rasa
```

If you want to install the full version with additional requirements, you can use:

```bash
pip install rasa[full]
```

## Usage

### Train the model

Before using the chatbot, you need to train the Rasa model by running the following command:

```bash
rasa train
```

This will generate a trained model based on the configuration files and training data in your project directory.

### Run

To run the chatbot in the command line, you can use the following command:

```bash
rasa run
```

This will start a chat session where you can enter messages and receive responses from the chatbot.

### Run Action Server

If your chatbot uses custom actions, you need to run the action server in a separate terminal window to handle these actions. You can do this using the following command:

```bash
rasa run actions
```

### Test the model

To test the trained model with sample messages, you can use the following command:

```bash
rasa shell --debug
```

This will start a chat session with debug information enabled, allowing you to see the predicted intents and entities for each message.

If you want to test the model with custom actions, you need to run both the `rasa shell` and `rasa run actions` commands in separate terminal windows.

Note that the exact usage and behavior of the chatbot may vary depending on your project configuration and training data. You may need to adjust the configuration files and training data to suit your specific use case and requirements.

## API

### Javascript

If you want to use the API to communicate with the chatbot, you can use the following JavaScript code:

```js
const axios = require('axios');

const message = 'Hi';
const sender = 'ElaXan';
const modelEndpoint = 'http://127.0.0.1:5005/webhooks/rest/webhook';

axios.post(modelEndpoint, {
    message: message,
    sender: sender,
    tracker: {
        sender_id: sender,
        conversation_id: sender
    }
})
.then(response => {
    // Combine the text of all messages
    const text = response.data.reduce((acc, message) => {
        return acc + message.text;
    }, '');
    console.log({text}.text);
})
.catch(error => {
    console.log(error);
});
```

### cURL command

If you want to use a cURL command to communicate with the chatbot, you can use the following command:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"message":"Hi", "sender":"ElaXan", "tracker": {"sender_id": "ElaXan", "conversation_id": "ElaXan"}}' http://127.0.0.1:5005/webhooks/rest/webhook
```

Before running the code or command, you need to start Rasa with the `rasa run --enable-api` command. If you want to use custom actions, you need to start the action server with the `rasa run actions` command.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/YuukiPS/Chatbot/blob/main/LICENSE) file for details.
